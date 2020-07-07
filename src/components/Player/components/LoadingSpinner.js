import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames  from 'classnames'

const styles = theme => ({
  root: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
  hidden: {
    display: 'none',
  },
  loading: {
    color: theme.palette.common.white
  }
})

class LoadingSpinner extends Component{
  render(){
    const { 
      classes,
      playerControl
    } = this.props
    return (
      <div className={classNames(classes.root, {
        [classes.hidden]: !playerControl.waiting
      })}>
        <CircularProgress className={classes.loading} />
      </div>
    )
  }
}

export default withStyles(styles)(LoadingSpinner)



