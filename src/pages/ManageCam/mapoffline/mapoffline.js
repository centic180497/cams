import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mmx.png'
// import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
// import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Switch } from '@material-ui/core'
import { Portal } from 'react-leaflet-portal'
import Button from '@material-ui/core/Button'
import { renderToStaticMarkup } from 'react-dom/server'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import classNames from 'classnames'
import { divIcon } from 'leaflet'
import {MAP_OFFLINE_URL} from '../../../constant/constant_endpoint'
import MarkerComponent from './marker'
import 'react-leaflet/dist/react-leaflet'
import 'leaflet/dist/leaflet.css'
// import { Tooltip } from '@material-ui/core'
import {
  focusOnCam,
  fetchCamLocationSuccess,
  changeCamLocation,
  cancelFocusedCam,
  getCameraLocation,
  fetchCamLocation,
  configCam,
  changeCamStatus,
  changingCamStatus,
} from '../../../actions/action_camera'
import { showDeleteCamModal } from 'actions/action_modal'
import NewCameaMarker from '../../../components/Marker/NewCameaMarker'
// import LiveView from '../LiveView'
import { isEmpty } from 'lodash'
import './style.css'
import { Typography } from '@material-ui/core'
import { changeBoundsMap } from '../../../actions/action_map'
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
  text: {
    marginLeft: '100px',
    position: 'absolute',
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // textAlign: 'center'
  },
  iconButton: {
    padding: 4,
  },
  icon: {
    fontSize: 20,
  },
  control: {
    right: '10px',
    width: '40px',
    border: 'none',
    bottom: '0',
    cursor: 'pointer',
    height: '40px',
    outline: 'none',
    position: 'absolute',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
    userSelect: 'none',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  header: {
    display: 'flex',
    textAlign: 'right',
    marginLeft: 'auto',
    flexDirection: 'row',
    position: 'relative',
    right: '-6px',
    top:'-17px'
  },
  icon: {
    fontSize: 14,
  },
  iconButton1: {
    transformStyle: 'preserve-3d',
    position: 'absolute',
    right: 0,
    // padding: 6,
 
  },
  test: {
    marginLeft: '13px',
    width: '30px',
    height: '39px',
    marginTop: '13px',
    '&:hover': {
      // width: '38px',
      // height: '47px',
      // zIndex: 2,
      // transformStyle: 'preserve-3d',
      transformStyle: 'preserve-3d', 
      transition: '.3s ease-in-out',
       transform: 'scale(1.3)',
       transformOrigin: 'center'
    },
  },
  Popup: {
    width: '250px',
    // maxWidth: 600,
  },
  markerCamNameimg: {
    width: '100%',
    height: '500px',
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
  // markerCamName:{
  //   width:'100%',
  //   possition:"relative"
  // }
})
const iconcamera = new Icon({
  iconUrl: icon,
  iconSize: [30, 39],
  iconAnchor: [15, 39],
  popupAnchor: [0, -39],
})

class MapOffline extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      mouseUp: false,
      zoomEnd: false
  } 
  }
 
  // onViewportChanged = (viewport) => {
  //   // console.log('change viewport', viewport)
  //   let { mouseUp, zoomEnd } = this.state
  //   let { focusedCam } = this.props

  //   if(mouseUp || zoomEnd) {
  //     if(focusedCam !== -1) return
  //     this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  //   }
  //   // console.log('asdalksdjalsdkj')
  //   // this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
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
  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }

  handleClick = (e) => {
    let lat = e.latlng.lat
    let lng = e.latlng.lng
    const { isEditingCam, isAddingCam } = this.props
    if (isEditingCam) {
      this.props.changeCamLocation({ lat, lng })
    }
    if (isAddingCam) {
      this.props.fetchCamLocation({ lat, lng })
    }
  }

  // handlePortalClick = () => {
  //   const center = [15.892538563302992, 108.33192510216088]
  //   const { defaultZoom } = this.props
  //   this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
  // }
  // onViewportChanged = (viewport) => {
  //   this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  // }

  render() {
    const { classes, cams, infoWindow } = this.props
    const possition = [15.892538563302992,108.33192510216088]
    return (
      <div className={classes.root}>
        <Map
          // onmouseup={this.handleMouseUp}
          // onzoomend={this.handleZoomEnd}
          // onViewportChanged={this.onViewportChanged}
          fullscreenControl={true}
          center={possition}
          zoom={this.props.zoom}
          className={classes.map}
          onClick={this.handleClick}
          closePopupOnClick={false}
        >
          <TileLayer
            url={MAP_OFFLINE_URL}
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
              {/* <MarkerClusterGroup  
            zoomToShowLayer={true}
            disableClusteringAtZoom={13}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
            maxClusterRadius={50}
            
          > */}
            {cams.length > 0
              ? cams.map((cam, index) => {
                if (cam.id === this.props.focusedCam && this.props.isEditingCam) return null
                  return (
                    <MarkerComponent
                      key={index}
                      lat={cam.lat}
                      lng={cam.lng}
                      cam={cam}
                    />
                  )
                })
              : null}
                     {!isEmpty(this.props.editCam) && this.props.focusedCam !== -1 && (
                      <MarkerComponent
                      lat={this.props.editCam.lat}
                      lng={this.props.editCam.lng}
                      cam={{
                        ...this.props.editCam,
                        id: this.props.focusedCam,
                      }}
                    >
                    </MarkerComponent>
            
            )}
            {/* </MarkerClusterGroup> */}
            {!isEmpty(this.props.newCamCoor) && (
              <NewCameaMarker
                lat={this.props.newCamCoor.lat}
                lng={this.props.newCamCoor.lng}
              />
            )}
      
        </Map>
      </div>
    )
  }
}

const mapStateToProps = ({ map, cameras, manageCam }) => ({
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  cameras: cameras.addCamera,
  cams: cameras.cameras,
  focusedCam: cameras.focusedCam,
  newCamCoor: {
    lat: cameras.addCamera.lat,
    lng: cameras.addCamera.lng,
  },
  changingCamStatus: cameras.changingCamStatus,
  defaultZoom: map.defaultZoom,
  editCam: cameras.editCam.connection,
  isEditingCam: map.isEditingCam,
  isAddingCam: map.isAddingCam,
})
export default connect(mapStateToProps, {
  fetchCamLocation,
  focusOnCam,
  fetchCamLocationSuccess,
  cancelFocusedCam,
  changeCamStatus,
  changeBoundsMap,
  changeCamLocation: changeCamLocation,
  configCam: configCam,
  showDeleteCamModal,
})(withStyles(styles)(MapOffline))
