import React from 'react'
import { Router, Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import _ from 'lodash'

import LoggedInRoute from 'components/logged_in_route'
// import SecretRoute from 'components/SecretRoute'

import LoginPage from 'pages/login'
import Dashboard from 'pages/dashboard'
import Loading from 'components/Loading'

export default class Root extends React.Component {
  constructor() {
    super()
    this.state = {
      userLoaded: false,
    }
  }

  componentDidMount() {
    const me = localStorage.getItem('USER')

    if (me) {
      this.props.loadMe()
    }

    this.setState({ userLoaded: true })
  }

  render() {
    if (!this.state.userLoaded) {
      return <div />
    }
    if (this.props.isFetchingMe) {
      return <Loading />
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={LoginPage} exact/>
          <LoggedInRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    )
  }
}
