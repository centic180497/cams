import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CameraList from './CameraList'

const FlowInfo = React.lazy(() => import('./FlowInfo'))
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  },
  infoWrapper: {
    flexGrow: 1,
  },
})

class Flow extends Component {
  componentDidMount(){
    console.log('flow did mount')
  }

  componentDidUpdate(){
    console.log('flow did update')
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <CameraList />
        <div className={classes.infoWrapper}>
          <Route
            path={`/dashboard/flow/:camId`}
            render={props => <FlowInfo key={Math.random()} {...props} />}
          />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Flow)
