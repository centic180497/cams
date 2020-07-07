import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    alginItems: 'center',
    justifyContent: 'center',
  },
  process: {
    margin: 16,
  }
})

class Loading extends Component{
  render(){
    const { classes, size, thickness } = this.props
    return(
      <div className={classes.root}>
        <CircularProgress 
          className={classes.process}
          size={size}
          thickness={thickness}    
        />
      </div>
    )
  }
}

export default withStyles(styles)(Loading)