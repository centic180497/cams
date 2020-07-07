import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const styles = theme => ({
  root: {
    height: '100%',
  },
})

class Approved extends Component{
  render(){
    const { classes } = this.props
    return(
      <div className={classes.root}>
        
      </div>
    )
  }
}

export default connect()(withStyles(styles)(Approved))