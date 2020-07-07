import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Typography } from '@material-ui/core';
import { showInfoWindow } from '../../actions/action_map'
import { closePrevStreaming }  from '../../actions/action_streaming'
import LiveView from './LiveView'
import Shapshot from './Snapshot'
import './marker.scss'
import InfoWindow from './InfoWindow';
const styles = theme => ({
  root: {

  },
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%'
  },
  tooltip: {
    maxWidth: 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',

    borderRadius: '4px',
    padding: '4px 8px',
    left: '50%',
    margin: '8px 0'
  },
})

class Marker extends Component {
  state = {
    hover: false
  }
  _onMouseEnter = () => {
    this.setState({
      hover: true
    })
  }
  _onMouseLeave = () => {
    this.setState({
      hover: false
    })
  }
  _onMarkerClick = () => {
    const { infoWindow } = this.props
    const { id, lat, lng } = this.props.detail
    this.setState({
      hover: false
    })
    if(infoWindow !== -1 && infoWindow !== id){
      this.props.closePrevStreaming(infoWindow)
    }
    if(infoWindow !== id){
      this.props.showInfoWindow({
        center: { lat, lng },
        id
      })
    }
  }
  render(){
    const {
      classes,
      detail = {},
      infoWindow
    } = this.props
    const { hover } = this.state 
    const isShowInfoWindow = infoWindow === detail.id
    const markerStyles = cx('marker-instance', {
      'camera-normal': detail.status === 'enabled',
      'camera-disabled': detail.status === 'disabled',
      'marker-hover': hover && !isShowInfoWindow,
      'marker-editing': isShowInfoWindow
    })
    return(
      <div 
        className={markerStyles}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onMarkerClick}
      >
        {(hover && !isShowInfoWindow) && (
          <div className={classes.popper}>
            <div className={classes.tooltip}>
              <Typography color="inherit" noWrap align="center">
                {detail.name}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography>
              <span className="arrow" />
            </div>
          </div>
        )}
        {  isShowInfoWindow && <InfoWindow detail={detail}/>  }
      </div>
    )
  }
}

const mapStateToProps = ({map}) => ({
  infoWindow: map.showInfoWindow
})

export default connect(mapStateToProps,
  {
    showInfoWindow: showInfoWindow,
    closePrevStreaming: closePrevStreaming
  }
)(withStyles(styles)(Marker))