import React from 'react'
import {
    render,
    cleanup,
    fireEvent
} from 'react-testing-library'
import "jest-dom/extend-expect";

import MovieLayout from '../MovieLayout'

afterEach(cleanup)

test('matches snapshot', () => {
    const { asFragment } = render(<MovieLayout />)
    expect(asFragment()).toMatchSnapshot()
})