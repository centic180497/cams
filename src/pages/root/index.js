import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadMe } from 'actions/action_user'

import Root from './root'

function mapStateToProps(state) {
  return {
    currentUser: state.user.user,
    isFetchingMe: state.user.api.isFetchingMe
  }
}

export default connect(mapStateToProps, {loadMe})(Root)
