import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet'
// import icon from 'assets/icon/mX.png'
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
import 'leaflet.markercluster/dist/leaflet.markercluster.js'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'react-leaflet-markercluster/dist/styles.min.css'
import 'leaflet.markercluster/dist/leaflet.markercluster-src.js'
import _ from 'lodash'
// import 'leaflet.markercluster.freezable'

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
  control: {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'white',
    boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
  },
  svg:{
    color:'#4a4242'
  }
})
class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      layer: [],
      markers: null,
      zoom: 12,
      id:[]
    }
    this.ref = React.createRef();
  
  }
 
  onViewportChanged = (viewport) => {
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }
  handlePortalClick = () => {
    const center = [15.892538563302992, 108.33192510216088]
    const { changeBoundsMap } = this.props
    changeBoundsMap({ center: center, zoom: this.props.defaultZoom })
  }


  render() {
    const { classes, cams, infoWindow } = this.props
    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root} id="test">
        <Map
          fullscreenControl={true}
          center={possition}
          zoom={this.props.zoom}
          className={classes.map}
          onClick={this.handleClick}
          onViewportChanged={this.onViewportChanged}
          id="mapcluster"
          closePopupOnClick={false}
        >
          <Portal position="bottomright">
            <button
              className={classes.control}
              onClick={this.handlePortalClick}
            >
              <svg
                className="MuiSvgIcon-root jss2162"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z" className={classes.svg}></path>
              </svg>
            </button>
          </Portal>
          <TileLayer
            url="http://103.101.76.162:8081/styles/osm-bright/{z}/{x}/{y}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
          {/* <MarkerClusterGroup  
            onlayeradd={this.marker}
            zoomToShowLayer={true}
            disableClusteringAtZoom={13}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
            onClusterClick={this.handleZoomToShowLayer}
            maxClusterRadius={50}
            ref={this.zoomAndOpenPopup}
          > */}
            {cams.length > 0
              ? cams.map((cam, index) => {
                  return <MarkerComponent key={index} cam={cam} ref={this.ref}/>
                })
              : null}
          {/* </MarkerClusterGroup> */}
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
