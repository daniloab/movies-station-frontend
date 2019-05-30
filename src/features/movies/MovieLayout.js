import React, { Fragment } from 'react';
import styled, { keyframes } from "styled-components";

import global from '../../helpers/Global'
import { isEmpty } from '../../helpers/Functions'
import { history } from '../../helpers/History'

import { Row, Col } from '../../common/layout/Columns'
import Button from '../../common/layout/Button'

import notfound from '../../assets/notfound.png'

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`

const MovieWrapper = styled.div`
    border: 1px solid lightgray;
    height: 100%;
    animation: ${fadeIn} 2s;

    img {
        width: 100%;
        margin: auto;
    }
`

const MovieInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    padding: 1rem; 
    font-size: 1.2rem;
`

const Title = styled.p`
    font-weight: bold;
    font-size: 1.4rem;
`

const Genres = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`


const MovieLayout = ({ movie, handleOpenModal }) => {
    const handleDetails = (m) => history.push(({
        pathname: `/movies/details/${m.id}`,
        state: { movie: m }
    }))

    if(isEmpty(movie)) return <p>Loading...</p>
    
    return (
        <Col span={3} spanSm={12}>
            <MovieWrapper>
                <img src={movie.poster_path === null ? notfound : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`poster movie ${movie.title}`} />
                <MovieInfo>
                    <Title>{movie.title}</Title>
                    <Genres>
                        <p>Genres</p>
                        {movie.genres.join(' ') || ''}
                    </Genres>
                    <p>Release Date: {movie.release_date_formated}</p>
                    <Button onClick={() => handleOpenModal(movie)}>See Details</Button>
                </MovieInfo>
            </MovieWrapper>
        </Col>
    )
};

export default MovieLayout;
