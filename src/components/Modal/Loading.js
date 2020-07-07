import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    display:'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  progress: {
    margin: 8 * 2
  }
})

ReactModal.setAppElement('#app');

class Loading extends Component{
    
  render(){
    const { classes, isOpen, content } = this.props
    return (
      <ReactModal 
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, .6)'
          },
          content: {
            border: 'none',
            backgroundColor: 'transparent'
          }
        }}
      >
        <div className={classes.root}>
          <CircularProgress className={classes.progress} color="inherit"/>
          {content}
        </div>
      </ReactModal>
    )
  }
}

const mapStateToProps = ({modal}) => ({
  isOpen: modal.isOpen,
  content: modal.content,
})

export default connect(mapStateToProps)(withStyles(styles)(Loading))