import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import { closeModal } from 'actions/action_modal'
import { IconButton, Typography, Button } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import { Close, VideoLibraryOutlined, DepartureBoardOutlined } from '@material-ui/icons'

import VideoGallery from './VideoGallery'

ReactModal.setAppElement('#centic')

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
  icon: {
    fontSize: 20,
  },
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  header: {
    padding: 8,
    fontSize: 20,
    flexGrow: 0,
    borderBottom: '1px solid #ccc',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
  },
  left: {
    width: 150,
    padding: 4,
    flexGrow: 0,
    borderRight: '1px solid #ccc',
  },
  tabButton: {
    width: '100%',
    padding: '8px 10px',
    marginBottom: 4,
    textAlign: 'left',
    textTransform: 'none',
    '& $tabIcon': {
      marginLeft: -4,
    },
  },
  activeTab: {
    borderLeft: `4px solid ${indigo[800]}`,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  tabIcon: {
    marginRight: 8,
  },
  right: {
    flexGrow: 1,
    flexShrink: 1,
  },
})

const tabs = [
  { title: 'Xem lại video', id: 'video', icon: <VideoLibraryOutlined /> },
  { title: 'Lưu lượng', id: 'flow', icon: <DepartureBoardOutlined /> },
]

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
  },
  content: {
    padding: 0,
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
}

class CamInfoModal extends Component {
  state = {
    tab: 'video',
  }

  handleClose = () => {
    this.props.closeModal()
  }

  handleClick = tabId => {
    this.setState({
      tab: tabId,
    })
  }

  render() {
    const { classes, isOpen } = this.props
    return (
      <ReactModal isOpen={isOpen} onRequestClose={this.handleClose} style={modalStyles}>
        <IconButton className={classes.closeButton} onClick={this.handleClose}>
          <Close className={classes.icon} />
        </IconButton>
        <div className={classes.root}>
          <Typography className={classes.header}>Thông tin camera</Typography>
          <div className={classes.container}>
            <div className={classes.left}>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  className={classNames(classes.tabButton, {
                    [classes.activeTab]: this.state.tab === tab.id,
                  })}
                  onClick={event => this.handleClick(tab.id)}
                >
                  <div className={classes.tabIcon}>{tab.icon}</div>
                  {tab.title}
                </Button>
              ))}
            </div>
            <div className={classes.right}>{this.state.tab === 'video' && <VideoGallery />}</div>
          </div>
        </div>
      </ReactModal>
    )
  }
}

const mapStateToProps = ({ modal }) => {
  return {
    isOpen: modal.isOpen,
  }
}
export default connect(
  mapStateToProps,
  {
    closeModal,
  },
)(withStyles(styles)(CamInfoModal))
