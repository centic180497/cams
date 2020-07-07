import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import * as WebSocketActions from 'actions/websocket_actions'
import Layout from 'pages/layout'

const styles = theme => ({
  root: {
    height: '100vh',
  },
})

class Dashboard extends React.Component {
  componentDidMount() {
    WebSocketActions.initialize()
  }

  componentWillUnmount() {
    WebSocketActions.close()
  }

  render() {
    const { classes } = this.props
    
    return (
      <div id="dashboard" className={classes.root}>
        <Layout />
      </div>
    )
  }
}

export default withStyles(styles)(Dashboard)
