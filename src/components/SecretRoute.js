import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import _ from 'lodash'
import { loadUserData } from '../utils/localStorage'

const SecretRoute = ({ component: Component, ...rest }) => {
  const user = loadUserData()
  return (
    <Route
      {...rest}
      render={props =>
        (!_.isEmpty(user) && user.access_token !== undefined )? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default SecretRoute
