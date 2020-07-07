import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Layout from './layout'

function mapStateToProps(state) {
  return {}
}

export default withRouter(connect()(Layout))
