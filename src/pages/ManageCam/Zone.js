import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {}
})
class Zone extends Component{
  render(){
    const { classes } = this.props
    return (
      <div className={classes.root}>
        
      </div>
    )
  }
}

export default connect()(withStyles(styles)(Zone))