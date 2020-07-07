import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {

  }
})

class InfoWindow extends Component{
  render(){
    const {
      classes,
      detail
    } = this.props
    return(
      <div className={classes.root}>
        
      </div>
    )
  }
}

export default withStyles(styles)(InfoWindow)