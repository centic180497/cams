import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mmx.png'
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
    marginLeft: '13px',
    width: '30px',
    height: '39px',
    marginTop: '13px',
    '&:hover': {
      // transform: 'scale(1.5)',
      // width: "38px",
      // height: '47px',
      // zIndex: 2,
      // transformStyle: 'preserve-3d'
      transformStyle: 'preserve-3d', 
      transition: '.3s ease-in-out',
       transform: 'scale(1.3)',
       transformOrigin: 'center'
    },
  },
  imgseach: {
    width: '100%',
    // maxWidth: '300px',
    maxWidth: '100%',
    minHeight:'150px',
    // minHeight: '150px',
    maxHeight: '600px',
    height: '100%',
    pointerEvents:'none',
    objectFit:'fill'
  },
  Popup: {
    width: '300px',
    // maxWidth: 600,
  },
  markerCamName:{
    width:'100%',
    possition:"relative",
    height:'600px',
    paddingRight:"8px"
  },
  imgpopup:{
    width:'100%',
    paddingRight:"8px"
  }
})

class MarkerComponent extends React.Component {
  state = {
    hover: false,
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
        <img className={classes.test} src={icon}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        />
      </div>,
    )
    const iconcamera = divIcon({
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker
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
            <div className={classes.imgpopup}>
              <Popup
                autoPan={true}
                direction={'right'}
                onClose={() => this.handleClose()}
                className={classes.Popup}
              >
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
                <Typography className={classes.markerCamName}>
                  <img
                    className={classes.imgseach}
                    src={
                      'http://116.110.6.137:1085' + focusedVehicle.object_img
                    }
                  />
                </Typography>
              </Popup>
            </div>
          ) : (
            null// this.closePopups
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
