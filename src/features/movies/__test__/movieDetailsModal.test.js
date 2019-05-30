import React from 'react'
import {
    render,
    cleanup,
    fireEvent
} from 'react-testing-library'
import "jest-dom/extend-expect";

import MovieDetailsModal from '../MovieDetailsModal'

afterEach(cleanup)

test('matches snapshot', () => {
    const { asFragment } = render(<MovieDetailsModal />)
    expect(asFragment()).toMatchSnapshot()
})