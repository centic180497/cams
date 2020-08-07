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
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import Tooltip from '@material-ui/core/Tooltip'
import { Typography } from '@material-ui/core'
import { cancelHoverRowVehicle } from '../../../../actions/action_searchVehicles'
import _ from 'lodash'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import MakerComponent from './marker'
import { changeBoundsMap } from '../../../../actions/action_map'
import { Portal } from 'react-leaflet-portal'
import DivIcon from 'react-leaflet-div-icon'
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
  onViewportChanged = (viewport) => {
    console.log(viewport)
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }
  handlePortalClick = () => {
    const { center, zoom, defaultZoom } = this.props
    this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
  }
  // handleClose() {
  //  this.props.cancelHoverRowVehicle()
  //  this.props.focusedVehicle
  // }

  // handleClick(e) {
  //   console.log('e ne', e)
  //   this.setState({ currentPos: e.latlng })
  // }
  // ref = (e) => {
  //   console.log('ref',e);

  // }


  render() {
    const { classes, cams, focusedVehicle } = this.props

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
        <Map
          ref={this.mapref}
          fullscreenControl={true}
          center={this.props.center}
          zoom={this.props.zoom}
          className={classes.map}
          onViewportChanged={this.onViewportChanged}
          closePopupOnClick={false}
        >
          <Portal position="bottomright" className={classes.portal}>
            <Tooltip title="Boundmap" aria-label="Boundmap">
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
                  <path
                    d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z"
                    className={classes.svg}
                  ></path>
                </svg>
              </button>
            </Tooltip>
            {/* <Button className={classes.control} handlePortalClick={this.handlePortalClick()}></Button> */}
          </Portal>

          <TileLayer
            url="http://103.101.76.162:8081/styles/osm-bright/{z}/{x}/{y}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
          <MarkerClusterGroup
            onlayeradd={this.marker}
            zoomToShowLayer={true}
            disableClusteringAtZoom={13}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
            onClusterClick={this.handleZoomToShowLayer}
            maxClusterRadius={50}
            ref={this.zoomAndOpenPopup}
          >
            {cams.length > 0
              ? cams.map((cam, index) => {
                  return <MakerComponent key={index} cam={cam}></MakerComponent>
                })
              : null}
          </MarkerClusterGroup>
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
