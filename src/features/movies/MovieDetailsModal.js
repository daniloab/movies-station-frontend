import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components'
import Modal from 'react-responsive-modal';

import global from '../../helpers/Global'
import { isEmpty } from '../../helpers/Functions'
import { Row, Col } from '../../common/layout/Columns'
import Button from '../../common/layout/Button'
import notfound from '../../assets/notfound.png'

const DetailsWrapper = styled.div`
padding-right: 4rem;
padding-leftC: 4rem;  
margin-left: .5rem;

  span {
      font-size: 1.6rem
  }

  div {
      padding-bottom: 1rem;
  }
`

const StyledH1 = styled.h1`
    margin-top: 0;
    margin-bottom: .5rem;
    font-size: 32px;
`

const StyledH2 = styled.h2`
    margin-top: 0;
    margin-bottom: .5rem;
    font-size: 1.7rem;
`

const PageAction = styled.div`
    display: flex;
    justify-content: center;

    button {
    background: none;
    border: 1px solid ${global.style.primaryColor};
    text-transform: uppercase;
    padding: 1rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        cursor: pointer;
        color: white;
        background: ${global.style.primaryColor};
    }
    }
`

const BtnWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: .4rem;
    margin-left: -.5rem;
    margin-right: -.5rem;
`

const MovieDetailsModal = ({ visible, setVisible, movie, handleOpenModal }) => {

    if (isEmpty(movie)) return <span>Loading</span>
    
    return (
        <Modal
            open={visible}
            onClose={() => setVisible()}
            showCloseIcon={false}
            // classNames={ModalStyle}
            center
        >
            <Row>
                <Col span={3} spanSm={12} style={{ padding: '1rem' }}>
                    <img style={{ borderRadius: '.4rem' }}
                        src={movie.poster_path === null ? notfound : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`poster movie ${movie.title}`} />
                </Col>
                <Col span={9} spanSm={12}>
                    <DetailsWrapper>
                        <StyledH1>{movie.title}</StyledH1>
                        <div>
                            <StyledH2>Genres</StyledH2>
                            <span>
                                {movie.genres.join(' ') || ''}
                            </span>
                        </div>

                        <div>
                            <StyledH2>Release Date</StyledH2>
                            <span>{movie.release_date_formated}</span>
                        </div>
                        <div>
                            <StyledH2>Overview</StyledH2>
                            <span>{movie.overview}</span>
                        </div>
                    </DetailsWrapper>
                    <BtnWrapper >
                        <Button onClick={() => setVisible()}>
                            Fechar
                        </Button>
                    </BtnWrapper>
                </Col>
            </Row>
        </Modal>
    )
}

export default MovieDetailsModal;
