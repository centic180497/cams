import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { Icon } from 'leaflet'
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
import {MAP_OFFLINE_URL} from "../../../../constant/constant_endpoint"
import _ from 'lodash'
import { changeBoundsMap } from '../../../../actions/action_map'
import 'react-leaflet/dist/react-leaflet'
import 'leaflet/dist/leaflet.css'
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
class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  state = {
    hovered: false,
  }
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

    return (
      <div className={classes.root}>
        <Map
          fullscreenControl={true}
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
                className="MuiSvgIcon-root jss2162"
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
          </Portal>

          <TileLayer
            url={MAP_OFFLINE_URL}
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
            {cams.length > 0
              ? cams.map((cam, index) => {
                  return (
                    <div className={classes.automarker}>
                      <MarkerComponent cam={cam} key={index} />
                    </div>
                  )
                })
              : null}
        </Map>
      </div>
    )
  }
}

const mapStateToProps = ({ map, blackList }) => ({
  matchCams: blackList.vehicleHistory.matchCams,
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
})
export default connect(mapStateToProps, {
  changeBoundsMap,
})(withStyles(styles)(MapOffline))
