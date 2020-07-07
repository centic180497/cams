import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'

const styles = theme => ({

})

class EnhancedToolbar extends Component { 
  render (){
    const { classes } =this.props
    return (
      <Toolbar>
        
      </Toolbar>
    )
  }
}

export default connect()(withStyles(styles)(EnhancedToolbar))