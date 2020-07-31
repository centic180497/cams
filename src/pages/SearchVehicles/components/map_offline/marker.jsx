import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mmx.png'
import MarkerClusterGroup from 'react-leaflet-markercluster'
// import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
// import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
// import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
// import LiveView from '../LiveView'
import './style.css'
import { Typography } from '@material-ui/core'
import {
  cancelHoverRowVehicle,
  focusVehicle,
} from '../../../../actions/action_searchVehicles'
import _ from 'lodash'
import { renderToStaticMarkup } from 'react-dom/server'
import DivIcon from 'react-leaflet-div-icon'
import classNames from 'classnames'
import { divIcon } from 'leaflet'
import './marker.scss'
import { th } from 'date-fns/locale'
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
  Tooltip: {
    // padding: '5px 10px 0px 10px',
    // Opacity: 1,
  },
  Marker: {
    backgroundColor: 'black',
  },
  camName: {
    fontWeight: 600,
  },
  markerCamName: {
    margin: '0 !important',
    width: '100%',
  },
  test: {
    width: '30px',
    height: '39px',
    marginLeft: '13px',
    marginTop: '13px',
    '&:hover': {
      width: '38px',
      height: '38px',
      zIndex: 2,
      transformStyle: 'preserve-3d',
    },
  },
  imgseach: {
    width: '100%',
    // maxWidth: '300px',
    maxWidth: '100%',
    maxHeight: '600px',
    minHeight: '150px',
    height: '100%',
    pointerEvents: 'none',
    position: 'relative',
    objectFit: 'fill',
  },
  Popup: {
    width: '400px',
    // maxWidth: 600,
  },
  markerCamName: {
    width: '100%',
    position: 'relative',
  },
  markerCamNameimg: {
    width: '100%',
    height: '450px',
  },
  imgpopup: {
    width: '100%',
    paddingRight: '9px',
  },
})

class MakerComponent extends React.Component {
  // _onMarkerClick = (item) => {
  //   console.log(item.lat)
  //   const { infoWindow } = this.props
  // }

  //   _onClick = ({ id, lat, lng }) => {
  //     const { infoWindow } = this.props
  //     if ((infoWindow !== -1) & (infoWindow !== id)) {
  //       this.props.closePrevStreaming(infoWindow)
  //     }
  //     if (infoWindow !== id) {
  //       this.props.showInfoWindow({
  //         center: { lat, lng },
  //         id,
  //       })
  //     }
  //   }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      console.log(marker)

      marker.leafletElement.openPopup()
    }
  }
  handleClose() {
    this.props.cancelHoverRowVehicle()
    this.props.focusVehicle(this.props.focusedVehicle)
  }
  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }

  render() {
    const { classes, cams, focusedVehicle, cam } = this.props
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === cam.id
    const iconmaker = renderToStaticMarkup(
      <div
        className={classNames('marker-instance', {
          // 'marker-hover': hover || isShowInfoWindow,
          'cam-alert': this.props.matchCams.includes(cam.id),
        })}
      >
        <img className={classes.test} src={icon} />
        {/* <Marker icon={camera}></Marker> */}
      </div>,
    )
    const iconcamera = divIcon({
      // iconUrl: camera,
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker,
    })
    const possition = [15.87944, 108.335]
    return (
      <Marker
        // onClick={() => this._onClick(cam)}
        position={[cam.lat, cam.lng]}
        icon={iconcamera}
        // icon={iconcamera}
        ref={
          focusedVehicle && _.get(focusedVehicle, 'camera.id') === cam.id
            ? this.openPopup
            : null
        }
      >
        {focusedVehicle && _.get(focusedVehicle, 'camera.id') === cam.id ? (
          <Popup
            className={classes.Popup}
            closePopupOnClick={true}
            onClose={() => this.handleClose()}
          >
            <div className={classes.imgpopup}>
              <Typography
                className={classes.markerCamName}
                className={classes.camName}
              >
                Biển số xe:{focusedVehicle.plate_number}
              </Typography>
              <Typography className={classes.markerCamName}>
                {cam.name}
              </Typography>
              <Typography className={classes.markerCamName}>
                {focusedVehicle.timestamp}
              </Typography>
              <Typography className={classes.markerCamName}>
                {focusedVehicle.address}
              </Typography>
              <Typography className={classes.markerCamNameimg}>
                <img
                  className={classes.imgseach}
                  src={`http://116.110.6.137:1085${focusedVehicle.object_img}`}
                />
              </Typography>
            </div>
          </Popup>
        ) : null}
        <div className={classes.custom}>
          <Tooltip className={classes.Tooltip} direction={'top'}>
            <Typography align="center" className={classes.camName}>
              {cam.name}{' '}
            </Typography>
            <Typography align="center">{cam.address} </Typography>
          </Tooltip>
        </div>
      </Marker>
    )
  }
}

const mapStateToProps = ({ map, searchVehicles }) => ({
  //   infoWindow: map.showInfoWindow,
  focusedVehicle: searchVehicles.focusedVehicle,
  matchCams: searchVehicles.matchCams,
})
export default connect(mapStateToProps, {
  cancelHoverRowVehicle,
  focusVehicle,
})(withStyles(styles)(MakerComponent))
