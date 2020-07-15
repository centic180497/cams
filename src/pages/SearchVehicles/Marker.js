import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import _ from 'lodash'

import './marker.scss'
import InfoWindow from './InfoWindow'

const styles = theme => ({
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%',
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
    margin: '8px 0',
  },
})

class Marker extends Component {
  state = {
    hover: false,
  }
  
  _onMouseEnter = () => {
    this.setState({
      hover: true,
    })
  }

  _onMouseLeave = () => {
    this.setState({
      hover: false,
    })
  }
  render() {
    const { classes, detail = {}, hoveredVehicle = {}, matchCams = [], focusedVehicle ={} } = this.props
    // console.log(matchCams[0])
    // console.log('render', matchCams, detail.id, matchCams.includes(detail.id))
    const { hover } = this.state
    // const isShowInfoWindow = _.get(hoveredVehicle, 'camera.id') === detail.id
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === detail.id
    // console.log('marker re render')
    return (
      <div
        className={classNames('marker-instance', {
          'camera-normal': detail.status === 'enabled',
          'camera-disabled': detail.status === 'disabled',
          'marker-hover': hover || isShowInfoWindow,
          'cam-alert': matchCams.includes(detail.id),
        })}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {hover && !isShowInfoWindow && (
          <div className={classes.popper}>
            <div className={classes.tooltip}>
              <Typography color="inherit" noWrap align="center">
                {detail.name}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography>
              <span className="arrow-bottom" />
            </div>
          </div>
        )}
        {isShowInfoWindow && (
          <InfoWindow
            // vehicle={hoveredVehicle}
            vehicle={focusedVehicle}
            closeHoverInfo={this._onMouseLeave}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ searchVehicles }) => {
  return {
    hoveredVehicle: searchVehicles.hoveredVehicle,
    focusedVehicle: searchVehicles.focusedVehicle,
    matchCams: searchVehicles.matchCams,
    isFetching: searchVehicles.isFetching,
  }
}

export default connect(mapStateToProps, null)(withStyles(styles)(Marker))
