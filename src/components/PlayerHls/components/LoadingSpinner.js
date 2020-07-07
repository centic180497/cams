import React, { Component } from 'react'
import { connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import classNames  from 'classnames'
import CircularProgress from '@material-ui/core/CircularProgress';

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

class LoadingSpinner extends Component {
  render(){
    const {
      classes, player
    } = this.props
    
    return (
      <div className={classNames(classes.root,{
        [classes.hidden]: !player.waiting
      })}>
        <CircularProgress className={classes.loading}/>
      </div>
    )
  }
}


export default  withStyles(styles)(LoadingSpinner)