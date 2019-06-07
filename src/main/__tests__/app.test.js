import React from 'react'
import {
    render,
    cleanup,
    fireEvent
} from 'react-testing-library'
import "jest-dom/extend-expect";

import App from '../app'

afterEach(cleanup)

test('matches snapshot', () => {
    const { asFragment } = render(<App />)
    expect(asFragment()).toMatchSnapshot()
})