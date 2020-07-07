import React from 'react'
import { Route } from 'react-router-dom'

import LoggedIn from 'components/logged_in'

const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <LoggedIn {...props}>
        <Component {...props} />
      </LoggedIn>
    )}
  />
)

export default LoggedInRoute
