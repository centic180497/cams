import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import LoginForm from '../../../components/Pages/Login/LoginForm'

const mapStateToProps = ({user}) => {
    return { 
        errors: user.errors, 
        fetching: user.fetching 
    }
}

export default connect(mapStateToProps)(LoginForm)