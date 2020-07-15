import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon, L} from 'leaflet'
import icon from 'assets/icon/mX.png'
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
// import MarkerClusterGroup from 'react-leaflet-markercluster/dist/react-leaflet-markercluster'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
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
  camName: {
    fontWeight: 600,
  },
  markerCamName: {
    margin: '0 !important',
  },
  // Popup:{
  //   width: '480px !important',
  // },
  // video:{
  //   width:'100%',
  //   maxWidth:480
  // }
})
const iconcamera = new Icon({
  iconUrl: icon,
  iconSize: [30, 39],
  iconAnchor: [15, 39],
  popupAnchor: [0, -39],
  tooltipAnchor:[0,-39],
  className:"hover"
}) 
const getMapBounds = (map, maps, cameras) => {
  const bounds = new maps.LatLngBounds()
  cameras.map(cam => {
    bounds.extend(new maps.LatLng(cam.lat, cam.lng))
  })
  return bounds
}

const apiIsLoaded = (map, maps, cameras) => {
  if (cameras.length > 0) {
    const bounds = getMapBounds(map, maps, cameras)
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      let extendPoint1 = new maps.LatLng(
        bounds.getNorthEast().lat() + 0.01,
        bounds.getNorthEast().lng() + 0.01,
      )
      let extendPoint2 = new maps.LatLng(
        bounds.getNorthEast().lat() - 0.01,
        bounds.getNorthEast().lng() - 0.01,
      )
      bounds.extend(extendPoint1)
      bounds.extend(extendPoint2)
    }
    map.fitBounds(bounds)
  }
}
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
//   onViewportChanged = (viewport) => {
//     // console.log(viewport)
//     this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
//   }
//   handlePortalClick = () => {
//     // const { cameras } = this.props
//     // apiIsLoaded(this.map, this.maps, cameras)
//     const center=[15.892538563302992,108.33192510216088]
//     const{changeBoundsMap}=this.props
//     changeBoundsMap({center:center,zoom:this.props.defaultZoom})
//   }

  openPopup(marker) {
    console.log(marker)

    if (marker && marker.leafletElement) {
      // if (marker.leafletElement._zoom > 13) {
      //   marker.leafletElement.openPopup()
      // }
      marker.leafletElement.openPopup()
    }
    //   marker.zoomToShowLayer(target, function() {
    //     target.openPopup();
    //   })
    // });
  }
  // handleClose(id) {
  //   // this.props.showInfoWindow({ id: -1 })
  //   this.props.closeInfoWindow({ id: -1 })
  // }
//   zoomToShowLayer(markers) {
    
//     console.log("dasdad",markers);
//     markers.layer.zoomToBounds();
//     markers.layer.openPopup()
//     // markers.openPopup()
//     // markers.layer.openPopup()
//     // markers.freezeAtZoom(15)


//     // markers.target._maxzoom=15
//     // markers.layer.openPopup()
// //     target.__parent.zoomToBounds();
// // target.__parent.spiderfy();
// // target.openPopup();
//   //   console.log(markers);
//   }
  render() {
    const { classes, cams, infoWindow,cam,key } = this.props

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
                      ref={
                        infoWindow && cam.id === infoWindow
                          ? this.openPopup
                          : null
                      }
                    >
                      <Popup
                        // onClose={() => this.handleClose(cam.id)}
                        className={classes.Popup}
                      >
                        <Typography className={classes.markerCamName}>
                          {cam.name}
                        </Typography>
                        <LiveView id={cam.id} className={classes.video} />
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

const mapStateToProps = ({ map,cameras }) => ({
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
