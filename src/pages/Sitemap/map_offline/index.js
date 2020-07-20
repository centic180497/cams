import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon, L, markerClusterGroup } from 'leaflet'
import icon from 'assets/icon/mX.png'
import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
import LiveView from '../LiveView'
import './style.css'
import MarkerComponent from './maker.js'
// import 'leaflet.markercluster';
import { Typography } from '@material-ui/core'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import { Portal } from 'react-leaflet-portal'
import { divIcon } from 'leaflet'
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
  tooltipAnchor: [0, -39],
  className: 'hover',
})


// const getMapBounds = (map, maps, cameras) => {
//   const bounds = new maps.LatLngBounds()
//   cameras.map(cam => {
//     bounds.extend(new maps.LatLng(cam.lat, cam.lng))
//   })
//   return bounds
// }

// const apiIsLoaded = (map, maps, cameras) => {
//   if (cameras.length > 0) {
//     const bounds = getMapBounds(map, maps, cameras)
//     if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
//       let extendPoint1 = new maps.LatLng(
//         bounds.getNorthEast().lat() + 0.01,
//         bounds.getNorthEast().lng() + 0.01,
//       )
//       let extendPoint2 = new maps.LatLng(
//         bounds.getNorthEast().lat() - 0.01,
//         bounds.getNorthEast().lng() - 0.01,
//       )
//       bounds.extend(extendPoint1)
//       bounds.extend(extendPoint2)
//     }
//     map.fitBounds(bounds)
//   }
// }
class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    this.Ref = React.createRef()
  }

  // componentDidUpdate(prevProps) {
  //   const { cameras = [] } = this.props
  //   const arrCams = cameras.map(cam => cam.id)
  //   const prevArrCams = prevProps.cameras.map(cam => cam.id)

  //   if (
  //     prevProps.cameropenPopupas.length > 0 &&
  //     this.props.cameras.length > 0 &&
  //     !_.isEqual(arrCams, prevArrCams)
  //   ) {
  //     apiIsLoaded(this.map, this.maps, cameras)
  //   }
  // }
  // _onClick = ({ id, lat, lng }) => {
  //   const { infoWindow } = this.props

  //   if ((infoWindow !== -1) & (infoWindow !== id)) {
  //     this.props.closePrevStreaming(infoWindow)
  //   }
  //   if (infoWindow !== id) {
  //     this.props.showInfoWindow({
  //       center: { lat, lng },
  //       id,
  //     })
  //   }
  // }
  onViewportChanged = (viewport) => {
    console.log('asdhakjsdhk')

    // console.log(viewport)
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }
  handlePortalClick = () => {
    // const { cameras } = this.props
    // apiIsLoaded(this.map, this.maps, cameras)
    const center = [15.892538563302992, 108.33192510216088]
    const { changeBoundsMap } = this.props
    changeBoundsMap({ center: center, zoom: this.props.defaultZoom })
  }

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
  // // handleClose(id) {
  // //   // this.props.showInfoWindow({ id: -1 })
  // //   this.props.closeInfoWindow({ id: -1 })
  // // }
  // handleClick(marker) {
  //   // console.log('marker.layer', marker.layer)
  // }
  zoomToShowLayer = (markers) => {
    const { cams } = this.props
    // console.log(this.props.cams, 'dadasihdi')

    // console.log(markers)

    markers.layer.zoomToBounds()

    const layer = markers.layer.getAllChildMarkers()
  }
  onzoomend = (e) => {
    // var mcg = L.markerClusterGroup()
    console.log('eeeeeeeeee////', e)
    // e.zoomToShowLayer(e,function(){
    //   // e.openPopup();
    // })
    e.leafletElement.openPopup()
  }
  Add = (e) => {
    // console.log('e', e)

    // let id = '5e950e72c95ba32d4eaf80c2'
    let id =this.props.cams.filter(cam=>cam.id===this.props.infoWindow)
    // console.log("ididd",id);
    
  }

  render() {
    const { classes, cams, infoWindow } = this.props

    // console.log('infowindow...', infoWindow);
    // console.log('cams...', cams);

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
        <Map
          fullscreenControl={true}
          center={possition}
          zoom={this.props.zoom}
          className={classes.map}
          onClick={this.handleClick}
          onViewportChanged={this.onViewportChanged}
          animate={true}
          onZoomEnd={this.onChangeView}
        >
          <Portal position="bottomright">
            <button
              className={classes.control}
              onClick={this.handlePortalClick}
            >
              <svg
                class="MuiSvgIcon-root jss2162"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z"></path>
              </svg>
            </button>
            {/* <Button className={classes.control} handlePortalClick={this.handlePortalClick}></Button> */}
          </Portal>
          {/* <FullscreenControl position="topright" /> */}
          <TileLayer
            url="http://10.49.46.13:8081/styles/osm-bright/{z}/{x}/{y}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
          <MarkerClusterGroup
            // onClusterMouseOver={this.test}
            // wrapperOptions={{enableDefaultStyle: true}}
            zoomToShowLayer={true}
            disableClusteringAtZoom={13}
            // autoClose={false}
            // autoPan={false}
            onClusterZoomToBounds={true}
            showCoverageOnHover={true}
            spiderfyOnMaxZoom={true}
            animateAddingMarkers={true}
            // animate={true}
            onClusterClick={this.zoomToShowLayer}
            removeOutsideVisibleBounds={true}
            // freezeAtzoom={}
            hasLayer={true}
            //  removeOutsideVisibleBounds={true}
            maxClusterRadius={50}
            // chunkedLoading={true}
            ref={this.ref}
            onClusterlayeradd={this.layeradd}
            onlayeradd={this.Add}
           zoomToShowLayer={this.onzoomend}
          >
            {cams.length > 0
              ? cams.map((cam, index) => {
                  return <MarkerComponent key={index} cam={cam} />
                })
              : null}
          </MarkerClusterGroup>
        </Map>
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
})(withStyles(styles)(MapOffline))
