import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import _ from 'lodash'
import styles from './styles'
import './marker.scss'
import InfoWindow from './InfoWindow'

class Marker extends Component {
  state = {
    hovered: false,
  }
  handleMouseEnter = () => {
    this.setState({
      hovered: true,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      hovered: false,
    })
  }
  render() {
    // console.log(this.props.$geoService.getWidth())
    // console.log(this.props.$geoService.getHeight())
    const { classes, data, matchCams = [], focusedVehicle } = this.props
    // console.log(data.name, this.props.$getDimensions(this.props.$dimensionKey))
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === data.id
    console.log(matchCams)
    return (
      <div
        className={classNames('marker-instance', {
          'camera-normal': data.status === 'enabled',
          'camera-disabled': data.status === 'disabled',
          'marker-hover': this.state.hovered || isShowInfoWindow,
          'cam-alert': matchCams.includes(data.id),
        })}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.hovered && !isShowInfoWindow && (
          <div className={classes.popper}>
            <div className={classes.tooltip}>
              <Typography color="inherit" noWrap align="center">
                {data.name}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {data.address}
              </Typography>
              <span className="arrow-bottom" />
            </div>
          </div>
        )}
        {isShowInfoWindow && (
          <InfoWindow
            data={focusedVehicle}
            closeHoverInfo={this.handleMouseLeave}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ blackList }) => ({
  matchCams: blackList.vehicleHistory.matchCams,
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
})
export default connect(mapStateToProps)(withStyles(styles)(Marker))
