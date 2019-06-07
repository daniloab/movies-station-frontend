import { checkLocalStorageGenres, transformMovie, isEmpty } from './Functions'
import httpRequest from './HttpRequest';

import { history } from './History'

/**
 * Realiza a busca dos próximos filmes a serem lançados
 *
 * @param {*} page
 */
export const moviesUpcoming = async page => {
    try {
        let hasGenres = checkLocalStorageGenres('genres', null)

        if (isEmpty(hasGenres)) {
            hasGenres = await getGenres()
            localStorage.setItem('genres', JSON.stringify(hasGenres))
        }

        const movies = await getMoviesUpcoming(page)
        const moviesWithGenres = transformMovie(movies, hasGenres)
        return moviesWithGenres
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

/**
 * Realiza a busca dos filmes pelo que foi digitado na busca
 *
 * @param {*} query
 * @param {*} page
 */
export const moviesSearch = async (query, page) => {
    try {
        let hasGenres = checkLocalStorageGenres('genres', null)

        if (isEmpty(hasGenres)) {
            hasGenres = await getGenres()
            localStorage.setItem('genres', JSON.stringify(hasGenres))
        }

        const movies = await getMoviesSearch(query, page)
        const moviesSearchWithGenres = transformMovie(movies.results, hasGenres)
        return moviesSearchWithGenres
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

/**
 * Realiza a busca dos detalhes do filme pelo id
 *
 * @param {*} movieId id do filme
 */
export const movieDetails = async (movieId) => {
    try {
        const movie = await getMovieDetails(movieId)
        return movie
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

const getMoviesUpcoming = async (page) => {
    try {
        const req = await httpRequest({
            url: `/upcoming?page=${page}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

const getMoviesSearch = async (query, page) => {
    try {
        const req = await httpRequest({
            url: `/search?query=${query}&page=${page}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

const getMovieDetails = async (movieId) => {
    try {
        const req = await httpRequest({
            url: `/id=${movieId}`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}

const getGenres = async () => {
    try {
        const req = await httpRequest({
            url: `/genres`,
            method: 'GET'
        })

        return await req;
    } catch (error) {
        window.alert('Alguem erro aconteceu. Tente novamente, por favor.')
        history.push('/')
    }
}




