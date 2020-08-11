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
import IconButton from '@material-ui/core/IconButton'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
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
      transformStyle: 'preserve-3d', 
      transition: '.3s ease-in-out',
       transform: 'scale(1.3)',
       transformOrigin: 'center'
    },
  },
  imgseach: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '600px',
    minHeight: '150px',
    height: '100%',
    pointerEvents: 'none',
    position: 'relative',
    objectFit: 'fill',
  },
  header: {
    display: 'flex',
    textAlign: 'right',
    marginLeft: 'auto',
    flexDirection: 'row',
    position: 'relative',
  },
  icon: {
    fontSize: 14,
  },
  iconButton: {
    transformStyle: 'preserve-3d',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  Popup: {
    width: '400px',
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
   state = {
    hover: false,
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      console.log(marker)

      marker.leafletElement.openPopup()
    }
  }
  handleClose(id) {
    
    this.props.cancelHoverRowVehicle({id:-1})
  }
  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }
  _onClose=()=>{
    this.setState({
      hover: false,
    })
    this.props.cancelHoverRowVehicle()
    this.props.focusVehicle({id:-1})
  }

  render() {
    const { classes, cams, focusedVehicle, cam } = this.props
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === cam.id
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
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker,
    })
    const possition = [15.87944, 108.335]
    return (
      <Marker
        position={[cam.lat, cam.lng]}
        icon={iconcamera}
        ref={
          focusedVehicle && _.get(focusedVehicle, 'camera.id') === cam.id
            ? this.openPopup
            : this.closePopups
        }
      >
        {focusedVehicle && _.get(focusedVehicle, 'camera.id') === cam.id ? (
          <Popup
            className={classes.Popup}
            closePopupOnClick={true}
            closeButton	={false}
            // onClose={() => this.handleClose(this.props.cam.id)}
          >
          <div className={classes.header}>
            <IconButton className={classes.iconButton} onClick={this._onClose}>
              <ClearOutlined className={classes.icon} />
            </IconButton>
          </div>
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
  focusedVehicle: searchVehicles.focusedVehicle,
  matchCams: searchVehicles.matchCams,
})
export default connect(mapStateToProps, {
  cancelHoverRowVehicle,
  focusVehicle,
})(withStyles(styles)(MakerComponent))
