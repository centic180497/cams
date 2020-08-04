import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { Icon } from 'leaflet'
// import icon from 'assets/icon/mX.png'
// import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
// import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
import './style.css'
import { Typography } from '@material-ui/core'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import FullscreenControl from 'leaflet-fullscreen'
import 'assets/styles/components/_marker.scss'
import './marker.scss'
import MarkerComponent from './marker'
import classNames from 'classnames'
import { Portal } from 'react-leaflet-portal'
import MarkerClusterGroup from 'react-leaflet-markercluster'

import _ from 'lodash'
import { changeBoundsMap } from '../../../../actions/action_map'

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
// const iconcamera = new Icon({
//     iconUrl: icon,
//     iconSize: [30, 39],
//     iconAnchor: [15, 39],
//     popupAnchor: [0, -39],
//     className:'testmarker',
// })
class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = {
    hovered: false,
  }
  // handleClick(e) {
  //   console.log('e ne', e)
  //   this.setState({ currentPos: e.latlng })
  // }
  onViewportChanged = (viewport) => {
    console.log(viewport)
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }
  handlePortalClick = () => {
    const possition = [15.87944, 108.335]
    const { center, zoom, defaultZoom } = this.props
    this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
    console.log(this.props.zoom, this.props.center)
    console.log(this.props.defaultZoom)
  }

  render() {
    const { classes, cams, infoWindow, matchCams, focusedVehicle } = this.props
    // console.log('render', matchCams)
    // var btnClass = classNames('marker-instance', {
    //     'camera-normal': cams.status === 'enabled',
    //     'camera-disabled': cams.status === 'disabled',
    //     // 'marker-hover':  isShowInfoWindow,
    //     'cam-alert': matchCams.includes(this.props.cams.id),
    // });

    const possition = [15.892538563302992, 108.33192510216088]
    return (
      <div className={classes.root}>
        <Map
          fullscreenControl={true}
          fullscreenControlOptions={{ position: 'topright' }}
          center={this.props.center}
          zoom={this.props.zoom}
          className={classes.map}
          closePopupOnClick={false}
          onViewportChanged={this.onViewportChanged}
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
                <path
                  d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8c0 4.5 6 11 6 11s6-6.5 6-11zm-8 0c0-1.1.9-2 2-2s2 .9 2 2-.89 2-2 2c-1.1 0-2-.9-2-2zM5 20v2h14v-2H5z"
                  className={classes.svg}
                ></path>
              </svg>
            </button>
            {/* <Button className={classes.control} handlePortalClick={this.handlePortalClick()}></Button> */}
          </Portal>

          <TileLayer
            url="http://10.49.46.13:8081/styles/osm-bright/{z}/{x}/{y}.png"
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
                  return (
                    <div className={classes.automarker}>
                      <MarkerComponent cam={cam} key={index} />
                    </div>
                  )
                })
              : null}
          </MarkerClusterGroup>
        </Map>
      </div>
    )
  }
}

const mapStateToProps = ({ map, blackList }) => ({
  //   infoWindow: map.showInfoWindow,
  matchCams: blackList.vehicleHistory.matchCams,
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
})
export default connect(mapStateToProps, {
  //   showInfoWindow,
  //   closeInfoWindow,
  //   closePrevStreaming,
  changeBoundsMap,
})(withStyles(styles)(MapOffline))
