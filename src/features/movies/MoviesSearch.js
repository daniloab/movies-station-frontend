import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import { moviesSearch } from '../../helpers/Requests'
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

const SubtitlePage = styled.div`
padding: .5rem;
`

const MoviesSearch = (props) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isFetching, setIsFetching] = useState(false)

    // Modal
    const [movie, setMovie] = useState([])
    const [showModal, setShowModal] = useState(false)

    const fetchMoviesUpcoming = async (term, page) => {
        setQuery(term)
        let req = await moviesSearch(term, page)

        if (req.length <= 0) {
            setHasMore(false)
            setIsFetching(false)
            return (
                <>
                    <Container>
                        <SubtitlePage>
                            <p>Nothing found for {term}</p>
                        </SubtitlePage>
                    </Container>
                </>
            )
        }

        setSearchResults(prevState => [...prevState, ...req])
        setPage(page + 1)
        setIsFetching(false)

        if (req.length < 20) setHasMore(false)
    }

    useEffect(() => {
        setIsFetching(true)
        setSearchResults([])
        setHasMore(true)

        fetchMoviesUpcoming(props.term, 1)
    }, [props.term])

    const handleScroll = async (e) => {
        const elm = e.currentTarget;

        if (elm.scrollTop + elm.clientHeight >= elm.scrollHeight && hasMore && !isFetching) {
            setIsFetching(true)
            const req = await moviesSearch(query, page)

            setSearchResults(prevState => ([...prevState, ...req]))

            if (req.length < 20) {
                setHasMore(false)
            }
            setPage(page + 1)
            setIsFetching(false)
        }
    }

    const handleModal = (m) => {
        setMovie(m)
        setShowModal(!showModal)
    }

    const renderResults = () => {
        return searchResults.map(r => (
            <MovieLayout movie={r} key={r.id} handleOpenModal={handleModal} />
        ))
    }

    if (isEmpty(searchResults)) return <Loading loading={isFetching} />

    return (
        <>
            <MovieDetailsModal visible={showModal} setVisible={() => setShowModal(!showModal)} movie={movie} />
            <Wrapper onScroll={(e) => handleScroll(e)}>
                <Container>
                    <SubtitlePage>
                        <h1>Movies > Search > {query}</h1>
                    </SubtitlePage>
                    <Row>
                        {renderResults()}
                        {isFetching && 'Fetching more movies...'}
                    </Row>
                </Container>
            </Wrapper>
        </>
    )


};

export default MoviesSearch;
