import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%'
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',
    borderRadius: '4px',
    // padding: '4px 8px',
    left: '50%',
    margin: '10px 0'
  },

})

class InfoWindow extends Component{
  render(){
    const { classes } = this.props
    return(
      <div className={classes.popper}>
        <div className={classes.tooltip}>
          <Card>
            
          </Card>
        </div>
      </div>
    )
  }
}

export default connect()(withStyles(styles)(InfoWindow))