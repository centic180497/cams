import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon, L } from 'leaflet'
import icon from 'assets/icon/mmx.png'
import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
import LiveView from '../LiveView'
import './style.css'
// import 'leaflet.markercluster';
import { Typography } from '@material-ui/core'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import { Portal } from 'react-leaflet-portal'
import { changeBoundsMap } from 'actions/action_map'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { divIcon } from 'leaflet'
// import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { renderToStaticMarkup } from 'react-dom/server'
import classNames from 'classnames'
import 'react-leaflet-markercluster/dist/styles.min.css'
import _ from 'lodash'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
    position: 'sticky',
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
  Popup:{
    width:'480px',
  },
  camName: {
    fontWeight: 600,
  },
  markerCamName: {
    margin: '0 !important',
    width: '100%',
  },
  imgpopup:{
    width: '480px',
    paddingRight: '9px',
  },
  video:{
    width:'100%'
  },
  test: {
    marginLeft: '13px',
    width: '30px',
    height: '39px',
    marginTop: '13px',
    '&:hover': {
      width: '38px',
      height: '38px',
      zIndex: 2,
      transformStyle: 'preserve-3d',
    },
  },
})

class MarkerComponent extends React.Component {
  _onClick = ({ id, lat, lng }) => {
    const { infoWindow } = this.props

    if ((infoWindow !== -1) & (infoWindow !== id)) {
      this.props.closePrevStreaming(infoWindow)
    }
    if (infoWindow !== id) {
      this.props.showInfoWindow({
        center: { lat, lng },
        id,
      })
    }
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  handleClose(id) {
    const { infoWindow } = this.props
   
      this.props.closeInfoWindow({ id:-1 })
    
  }
  render() {
    const { classes, cams, infoWindow, cam, key } = this.props
    const iconmaker = renderToStaticMarkup(
      <div className={classNames('marker-instance', {})}>
        <img className={classes.test} src={icon} />
      </div>,
    )
    const iconcamera = divIcon({
      // iconAnchor: [15, 39],
      // popupAnchor: [0, -39],
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker,
    })

    // console.log('infowindow...', infoWindow);
    // console.log('cams...', cams);

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
        <Marker
          key={key}
          position="right"
          onClick={() => this._onClick(cam)}
          position={[cam.lat, cam.lng]}
          icon={iconcamera}
          ref={infoWindow && cam.id === infoWindow ? this.openPopup : null}
        >
          <Popup
            onClose={() => this.handleClose(cam.id)}
            className={classes.Popup}

          >
            <div className={classes.imgpopup}>
            <Typography className={classes.markerCamName}>
              {cam.name}
            </Typography>
            <LiveView id={cam.id} className={classes.video} />
            </div>
          </Popup>

          <Tooltip className={classes.Tooltip} direction={'top'}>
            <Typography align="center" className={classes.camName}>
              {' '}
              {cam.name}{' '}
            </Typography>
            <Typography align="center"> {cam.address} </Typography>
          </Tooltip>
        </Marker>
      </div>
    )
  }
}

const mapStateToProps = ({ map, cameras }) => ({
  infoWindow: map.showInfoWindow,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  cams: cameras.cameras,
  fitBounds: map.fitBoundsMap,
})
export default connect(mapStateToProps, {
  showInfoWindow,
  closeInfoWindow,
  closePrevStreaming,
  changeBoundsMap,
})(withStyles(styles)(MarkerComponent))
