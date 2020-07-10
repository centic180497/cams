import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mX.png'
// import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
// import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
// import LiveView from '../LiveView'
import './style.css'
import { Typography } from '@material-ui/core'
import 'assets/styles/components/_marker.scss'
import './marker.scss'
import classNames from 'classnames'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import _ from 'lodash'
import {
  cancelFocusVehicleHistory,
  focusVehicleHistory,
  fetchVehicleHistory,
} from 'actions/action_blackList'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
  },
  map: {
    width: '100%',
    height: 'calc(100vh - 50px)',
  },
  Marker: {
    fontSize: '500px',
  },
  plate: {
    fontSize: 16,
    fontWeight: 500,
  },
  test: {
    marginLeft: '-3px',
    width: '30px',
    marginTop: '-6px',
  },
  imgseach:{
    width: '100%',
    maxWidth: '300px ',
    minWidth: '150px',

    maxHeight: '600px',
  },
  Popup:{
    width:'310px',
  }
})

class MarkerComponent extends React.Component {
  state = {
    hovered: false,
  }
  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  handleClose() {
    this.props.cancelFocusVehicleHistory()
    this.props.focusVehicleHistory(this.props.focusedVehicle)
  }

  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }
  

  render() {
    const {
      classes,
      cams,
      infoWindow,
      matchCams,
      focusedVehicle,
      cam,
    } = this.props
    const iconmaker = renderToStaticMarkup(
      <div
        className={classNames('marker-instance', {
          'cam-alert': this.props.matchCams.includes(cam.id),
        })}
      >
        <img className={classes.test} src={icon} />
      </div>,
    )
    const iconcamera = divIcon({
      // iconAnchor: [15, 39],
      // popupAnchor: [0, -39],
      iconSize: [15, 30],
      iconAnchor: [15, 30],
      popupAnchor: [-15, -43],
      html: iconmaker,
    })
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === cam.id
    return (
      <div className={classes.automarker}>
        <Marker
          position={[cam.lat, cam.lng]}
          icon={iconcamera}
          ref={isShowInfoWindow ? this.openPopup : this.closePopups}
          closePopupOnClick={true}
          direction={'right'}
  
        >
          {isShowInfoWindow ? (
            <Popup  autoPan={true} direction={'right'} onClose={() => this.handleClose()} className={classes.Popup}>
              <Typography noWrap className={classes.plate}>
                Biển số xe: {focusedVehicle.plate_number}
              </Typography>
              <Typography noWrap className={classes.camName}>
                {_.get(focusedVehicle, 'camera.name')}
              </Typography>
              <Typography noWrap className={classes.time}>
                {focusedVehicle.timestamp}
              </Typography>
              <Typography noWrap className={classes.address}>
                {focusedVehicle.address}
              </Typography>
              {/* <Typography className={classes.markerCamName}>
              <img className={classes.imgseach} src={'http://116.110.6.137:1085'+focusedVehicle.object_img} />
            </Typography> */}
            </Popup>
          ) : (
            this.closePopups
          )}
          <Tooltip className={classes.Tooltip} direction={'top'}>
            <Typography align="center" className={classes.camName}>
              {cam.name}{' '}
            </Typography>
            <Typography align="center">{cam.address} </Typography>
          </Tooltip>
        </Marker>
      </div>
    )
  }
}

const mapStateToProps = ({ map, blackList }) => ({
  //   infoWindow: map.showInfoWindow,
  matchCams: blackList.vehicleHistory.matchCams,
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
})
export default connect(mapStateToProps, {
  cancelFocusVehicleHistory,
  focusVehicleHistory,
  fetchVehicleHistory,
})(withStyles(styles)(MarkerComponent))