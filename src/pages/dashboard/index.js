import { connect } from 'react-redux'

import Dashboard from './dashboard'

function mapStateToProps(state){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Dashboard)
