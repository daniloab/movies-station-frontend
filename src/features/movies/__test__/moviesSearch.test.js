import React from 'react'
import {
    render,
    cleanup,
    fireEvent
} from 'react-testing-library'
import "jest-dom/extend-expect";

import MoviesSearch from '../MoviesSearch'

afterEach(cleanup)

test('matches snapshot', () => {
    const { asFragment } = render(<MoviesSearch />)
    expect(asFragment()).toMatchSnapshot()
})