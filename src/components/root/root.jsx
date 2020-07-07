import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import LoggedInRoute from 'components/logged_in_route'
import Dashboard from 'components/dashboard'

function Root() {
  return (
    <Switch>
      <LoggedInRoute path='/dashboard' component={Dashboard} />
      <Route path='/' exact component={Login} />
    </Switch>
  )
}

Root.display = 'Root'

export default Root