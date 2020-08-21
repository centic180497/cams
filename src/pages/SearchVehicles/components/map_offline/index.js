import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Icon } from 'leaflet'
// import icon from 'assets/icon/mX.png'
// import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
// import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
// import LiveView from '../LiveView'
import './style.css'
import Tooltip from '@material-ui/core/Tooltip'
import { Typography } from '@material-ui/core'
import { cancelHoverRowVehicle } from '../../../../actions/action_searchVehicles'
import _ from 'lodash'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import MakerComponent from './marker'
import { changeBoundsMap } from '../../../../actions/action_map'
import { Portal } from 'react-leaflet-portal'
import DivIcon from 'react-leaflet-div-icon'
import {MAP_OFFLINE_URL} from '../../../../constant/constant_endpoint'
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 'calc(100vh - 100px)',
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
  test: {
    border: '1px solid black',
  },
  cluster: {
    height: 100,
  },
  control: {
    borderRadius: '4px',
    border: 'none',
    backgroundColor: 'white',
    boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
  },
  svg: {
    color: '#4a4242',
  },
})

class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    // create a ref to store the textInput DOM element
    this.mapref = React.createRef()
  }
  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  // }
  // onViewportChanged = (viewport) => {
  //   let { mouseUp, zoomEnd } = this.state
  //   let { focusedVehicle } = this.props

  //   if(mouseUp || zoomEnd) {
  //     this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  //   }
  // }
  // handleZoomEnd = () => {
  //   this.setState({
  //     ...this.state,
  //     zoomEnd: true
  //   })
  // }
  // handleMouseUp = () => {
  //   this.setState({
  //     ...this.state,
  //     mouseUp: true
  //   })
  // }
  // handlePortalClick = () => {
  //   const center = [15.892538563302992, 108.33192510216088]
  //   const { zoom, defaultZoom } = this.props
  //   this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
  // }

  render() {
    const { classes, cams, focusedVehicle } = this.props

    const possition = [15.892538563302992,108.33192510216088] 
    return (
      <div className={classes.root}>
        <Map
        //  onmouseup={this.handleMouseUp}
        //  onzoomend={this.handleZoomEnd}
        //  onViewportChanged={this.onViewportChanged}
          ref={this.mapref}
          fullscreenControl={true}
          center={possition}
          zoom={13}
          className={classes.map}
          closePopupOnClick={false}
        >

          <TileLayer
            url={MAP_OFFLINE_URL}
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
                  return <MakerComponent key={index} cam={cam}></MakerComponent>
                })
              : null}
          {/* </MarkerClusterGroup> */}
        </Map>
      </div>
    )
  }
}

const mapStateToProps = ({ map, searchVehicles }) => ({
  //   infoWindow: map.showInfoWindow,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  focusedVehicle: searchVehicles.focusedVehicle,
})
export default connect(mapStateToProps, {
  cancelHoverRowVehicle,
  changeBoundsMap,
})(withStyles(styles)(MapOffline))
