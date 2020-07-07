import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoginPage from '../../../components/Pages/Login'

export default withRouter(connect()(LoginPage))
