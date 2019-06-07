import React, { useState } from 'react';

import {
    GlobalStyle,
} from '../common/layout/'

import Header from '../common/navigation/Header'

import MoviesUpcomingList from '../features/movies/MoviesUpcomingList'
import MoviesSearch from '../features/movies/MoviesSearch'


const App = () => {
    const [search, setSearch] = useState('')

    const handleClickSearch = text => setSearch(text)

    return (
        <>
            <GlobalStyle />
            <Header handleSearch={handleClickSearch} />
            {search.length <= 0 && <MoviesUpcomingList />}
            {search.length > 0 && <MoviesSearch term={search} />}
        </>
    )
}

export default App;
