import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import LoginPage from './login'
import { logIn } from 'actions/action_authetication'

const mapStateToProps = ({ user }) => ({
  user: user.user,
  isFetching: user.isFetching,
  authenticated: user.authenticated,
  initializing: true
})

export default withRouter(connect(mapStateToProps, { logIn: logIn })(LoginPage))
