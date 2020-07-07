import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Fullscreen from '@material-ui/icons/Fullscreen'
import TooltipWrapper from '../../components/TooltipWrapper';
const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px 20px 20px'
  },
  left: {

  },
  right: {

  },
  icon: {
    color: 'rgba(255, 0, 0, 0.6);'
  }
})

class Controls extends Component{
  
  render(){
    const {
      classes
    } = this.props
    return(
      <div className={classes.root}>
        <div className={classes.left}> 
          <TooltipWrapper title="Live Stream">
            <IconButton className="ripple" onClick={this.handleClick}>
              <PlayArrow className={classes.icon}/>
            </IconButton>
          </TooltipWrapper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Controls)