import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import brown from '@material-ui/core/colors/brown'
import WrapperPlayer from './WrapperPlayer';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: brown[100],
    overflow: 'hidden'
  },
  text: {
    color: theme.palette.common.black
  }
})

class EmptyPlayer extends Component{
  render(){
    const {
      classes
    } = this.props
    return(
      <WrapperPlayer>
        <div className={classes.root}>
          <Typography className={classes.text} noWrap>
            {/* Thêm từ bản đồ camera */}
          </Typography>
        </div>
      </WrapperPlayer>
    )
  }
}

export default withStyles(styles)(EmptyPlayer)