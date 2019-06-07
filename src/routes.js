import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import styled from 'styled-components'

import Header from './common/navigation/Header'
import App from './main/App'

const WrapperNotFound = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    font-size: 1.4rem;
`

const NotFound = () => (
    <WrapperNotFound>
        <span>Page Not Found :(</span>
        <Link to="/">go back home</Link>
    </WrapperNotFound>
)

const Routes = () => (
    <>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="*" component={NotFound} />
        </Switch>
    </>
)

export default Routes