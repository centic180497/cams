import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import Typography from '@material-ui/core/Typography'

import TooltipWrapper from '../../components/TooltipWrapper'
import { closeInfoWindow } from '../../actions/action_map'
import Snapshot from './Snapshot'
import LiveView from './LiveView'
// import Controls from './Controls'

const styles = theme => ({
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%',
    cursor: 'default'
  },
  tooltip: {
    width: 480,
    height: 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',
    borderRadius: '4px',
    // padding: '4px 8px',
    left: '50%',
    margin: '10px 0'
  },
  snapshot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.palette.common.black,
    position: 'relative'

  },
  snapshotImg: {
    // width: '100%',
    height: 270
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    padding: '4px 4px 0 4px'
  },
  title: {
    flexGrow: 1,
    fontWeight: 500
  },
  iconButton: {
    padding: 6
  },
  icon: {
    fontSize: 14
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px 20px 20px'
  }, 
  playIcon: {
    color: 'rgba(255, 0, 0, 0.6);'
  }
})

class InfoWindow extends Component{
  state = {
    livestream: false
  }
  
  componentDidMount(){
    // const { id } = this.props.detail
    // this.props.getCamSnapshot(id)
  }

  _onCloseInfoWindowClick = (e) => {
    const { id } = this.props.detail
    this.props.closeInfoWindow(id)
  }

  render(){
    const { 
      classes,
      detail = {},
      isGettingSnapshot,
      isFetchingStreaming,
      snapshotImageUrl,
      isShowLiveView,
    } = this.props

    return (
      <div 
        className={classes.popper}
        // onClick={ e => e.stopPropagation()}
      >
        <div className={classes.tooltip}>
          <div className={classes.header}>
            <Typography noWrap className={classes.title}>
              {detail.name}
            </Typography>
            <IconButton 
              className={classes.iconButton}
              onClick={this._onCloseInfoWindowClick}
            >
              <ClearOutlined className={classes.icon} />
            </IconButton>
          </div>
          {/* {isShowLiveView ? 
            <LiveView id={detail.id} /> : 
            <Snapshot id={detail.id} />
          } */}
          <LiveView id={detail.id} />
          <span className="arrow" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  isGettingSnapshot: cameras.isGettingSnapshot,
  snapshotImageUrl: cameras.snapshotImageUrl,
  isShowLiveView: cameras.isShowLiveView,
  isFetchingStreaming: cameras.isFetchingStreaming
})   

export default connect(mapStateToProps, 
  {
    closeInfoWindow
  }
)(withStyles(styles)(InfoWindow))