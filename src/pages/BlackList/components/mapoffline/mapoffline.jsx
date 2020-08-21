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

  // onViewportChanged = (viewport) => {
  //   console.log(viewport)
  //   this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  // }
  // onViewportChanged = (viewport) => {
  //   // console.log('change viewport', viewport)
  //   let { mouseUp, zoomEnd } = this.state
  //   let { focusedVehicle } = this.props

  //   if(mouseUp || zoomEnd) {
  //     // if(focusedVehicle !== -1) return
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
  //   const possition = [15.892538563302992,108.33192510216088]
  //   const { center, zoom, defaultZoom } = this.props
  //   this.props.changeBoundsMap({ center: possition, zoom: defaultZoom })
  
  // }

  render() {
    const { classes, cams, infoWindow, matchCams, focusedVehicle } = this.props
    const possition = [15.892538563302992,108.33192510216088]
    return (
      <div className={classes.root}>
        <Map
        //  onmouseup={this.handleMouseUp}
        //  onzoomend={this.handleZoomEnd}
        //  onViewportChanged={this.onViewportChanged}
          fullscreenControl={true}
          center={possition}
          zoom={13}
          className={classes.map}
          closePopupOnClick={false}
          // onViewportChanged={this.onViewportChanged}
        >
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
