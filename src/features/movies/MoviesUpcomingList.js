import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import { moviesUpcoming } from '../../helpers/Requests'
import { transformMovie, checkLocalStorageGenres } from '../../helpers/Functions'
import { isEmpty } from '../../helpers/Functions'

import { Row, Col } from '../../common/layout/Columns'
import { Container } from '../../common/layout/'
import Loading from '../../common/navigation/Loading'
import MovieLayout from './MovieLayout'
import MovieDetailsModal from './MovieDetailsModal'

const Wrapper = styled.div`
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    min-height: 160px;
    width: 100%;
`

const LoadingMore = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;
    padding: 4rem;

    span {
        font-size: 2rem;
    }
`

const MoviesUpcomingList = () => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isFetching, setIsFetching] = useState(false)

    // Modal
    const [movie, setMovie] = useState([])
    const [showModal, setShowModal] = useState(false)

    const fetchMoviesUpcoming = async (page) => {
        let req = await moviesUpcoming(page)
        
        setMovies(prevState => [...prevState, ...req])
        setPage(page + 1)
        setIsFetching(false)
    }

    useEffect(() => {
        setIsFetching(true)
        fetchMoviesUpcoming(1)
    }, [])

    const handleScroll = async (e) => {
        const elm = e.currentTarget;

        if (elm.scrollTop + elm.clientHeight >= elm.scrollHeight && hasMore && !isFetching) {
            setIsFetching(true)
            const req = await moviesUpcoming(page)

            setMovies(prevState => ([...prevState, ...req]))
            setPage(page + 1)

            if (req.length < 20) {
                setHasMore(false)
            }
            setIsFetching(false)
        }
    }

    const handleModal = (m) => {
        setMovie(m)
        setShowModal(!showModal)
    }

    const renderMovies = () => {
        return movies.map(m => (
            <MovieLayout movie={m} key={m.id} handleOpenModal={handleModal} />
        ))
    }

    if (isEmpty(movies)) return <Loading loading={isFetching} />

    return (
        <>
            <MovieDetailsModal visible={showModal} setVisible={() => setShowModal(!showModal)} movie={movie} />
            <Wrapper onScroll={(e) => handleScroll(e)}>
                <Container>
                    <Row>
                        {renderMovies()}
                        {isFetching &&
                            <LoadingMore>
                                <span>Fetching more movies...</span>
                            </LoadingMore>
                        }
                    </Row>
                </Container>
            </Wrapper>
        </>
    )


};

export default MoviesUpcomingList;