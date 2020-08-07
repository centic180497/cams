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
import MarkerComponent from './marker'
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

    // this.customMarker = React.createRef();
  }
  state = {
    hover: false,
  }
  // _onMarkerClick = (item) => {
  //   console.log(item.lat)
  //   const { infoWindow } = this.props
  // }

  //   _onClick = ({ id, lat, lng }) => {
  //     const { infoWindow } = this.props
  //     if ((infoWindow !== -1) & (infoWindow !== id)) {
  //       this.props.closePrevStreaming(infoWindow)
  //     }
  //     if (infoWindow !== id) {
  //       this.props.showInfoWindow({
  //         center: { lat, lng },
  //         id,
  //       })
  //     }
  //   }



  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  // handleClose = () => {
  //   console.log('handleClose')
  //   this.props.cancelFocusedCam()
  //   this.props.focusOnCam({ id: -1 })
  // }
  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }
  handleClick = (e) => {
    let lat = e.latlng.lat
    let lng = e.latlng.lng
    const { isEditingCam, isAddingCam } = this.props
    if (isEditingCam) {
      this.props.changeCamLocation({ lat, lng })
      // this.props.fetchCamLocation({ lat, lng })
    }
    if (isAddingCam) {
      // this.props.getCameraLocation({ lat, lng })
      this.props.fetchCamLocation({ lat, lng })
    }
    // this.props.fetchCamLocation({ lat, lng })
  }
  _onSwitchChange = (id, status) => (e) => {
    e.stopPropagation()
    let nextStatus
    if (status === 'disabled') {
      nextStatus = 'enabled'
    } else {
      nextStatus = 'disabled'
    }

    this.props.changeCamStatus(id, {
      status: nextStatus,
    })
  }
  handlePortalClick = () => {
    const center = [15.892538563302992, 108.33192510216088]
    const { defaultZoom } = this.props
    this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
  }
  onViewportChanged = (viewport) => {
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }

  handleConfigsClick = (e, cam) => {
    e.stopPropagation()
    console.log(cam)

    // const { id, lat, lng, name, ip } = this.props.detail
    const { id, lat, lng, name, ip } = cam
    this.props.configCam({
      center: { lat, lng },
      name,
      ip,
      zoom: 15,
      id,
    })
  }
  handleDelete = (event, cam) => {
    event.stopPropagation()
    this.props.showDeleteCamModal(cam)
  }
  _onClose=()=>{
    this.setState({
      hover: false,
    })
    this.props.cancelFocusedCam()
    this.props.focusOnCam({ id: -1 })


    console.log('asdkalsj')
  }
  render() {
    console.log(this.props.editCam);
    console.log(this.props.isEditingCam);
    const { classes, cams, infoWindow } = this.props
    const iconmaker = renderToStaticMarkup(
      <div
        className={classNames('marker-instance', {
          // 'cam-alert': this.props.matchCams.includes(cam.id),
        })}
      >
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
          closePopupOnClick={false}
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
          </Portal>
          <TileLayer
            url="http://103.101.76.162:8081/styles/osm-bright/{z}/{x}/{y}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
              <MarkerClusterGroup  
            zoomToShowLayer={true}
            disableClusteringAtZoom={13}
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={false}
            maxClusterRadius={50}
            
          >
            {cams.length > 0
              ? cams.map((cam, index) => {
                if (cam.id === this.props.focusedCam && this.props.isEditingCam) return null
                  return (
                    <MarkerComponent
                                key={index}
                                lat={cam.lat}
                                lng={cam.lng}
                                // onClick={() => this._onClick(cam)}
                                // position={[cam.lat, cam.lng]}
                                // icon={iconcamera}
                                // ref={
                                //   this.props.focusedCam &&
                                //   cam.id === this.props.focusedCam
                                //     ? this.openPopup
                                //     : this.closePopups
                                // }
                                cam={cam}
                    />
                    

          //           <Marker
          //             key={index}
          //             // onClick={() => this._onClick(cam)}
          //             position={[cam.lat, cam.lng]}
          //             icon={iconcamera}
          //             ref={
          //               this.props.focusedCam &&
          //               cam.id === this.props.focusedCam
          //                 ? this.openPopup
          //                 : this.closePopups
          //             }
          //           >
          //             <Popup
          //              closeButton	={false}
          //               // onClick={() => this.handleClose(cam.id)}
          //               // closeButton={this.handleClose}
          //               className={classes.Popup}
          //               // onremove={this.handleclose}
          //             >
          //                <div className={classes.header}>
          //   <IconButton className={classes.iconButton1} onClick={this._onClose}>
          //     <ClearOutlined className={classes.icon} />
          //   </IconButton>
          // </div>
          //               <Typography noWrap className={classes.markerCamName}>
          //                 {cam.name}
          //               </Typography>
          //               <Typography noWrap className={classes.markerCamName}>
          //                 {cam.address}
          //               </Typography>
          //               <Fragment>
          //                 <div className={classes.controls}>
          //                   <IconButton
          //                     className={classes.iconButton}
          //                     onClick={(e) => this.handleConfigsClick(e, cam)}
          //                   >
          //                     <SettingsIcon className={classes.icon} />
          //                   </IconButton>

          //                   <IconButton
          //                     className={classes.iconButton}
          //                     onClick={(e) => this.handleDelete(e, cam)}
          //                   >
          //                     <DeleteIcon className={classes.icon} />
          //                   </IconButton>

          //                   {cam.id === this.props.changingCamStatus ? (
          //                     <div className={classes.process}>
          //                       <CircularProgress size={16} />
          //                     </div>
          //                   ) : (
          //                     <Switch
          //                       color="primary"
          //                       size="small"
          //                       checked={cam.status !== 'disabled'}
          //                       onChange={this._onSwitchChange(
          //                         cam.id,
          //                         cam.status,
          //                       )}
          //                     />
          //                   )}
          //                 </div>
          //               </Fragment>
          //             </Popup>

          //             <Tooltip className={classes.Tooltip} direction={'top'}>
          //               <Typography align="center" className={classes.camName}>
          //                 {' '}
          //                 {cam.name}
          //               </Typography>
          //               <Typography align="center"> </Typography>
          //             </Tooltip>
          //           </Marker>
                  )
                })
              : null}
                     {!isEmpty(this.props.editCam) && this.props.focusedCam !== -1 && (
                 <MarkerComponent
                 lat={this.props.editCam.lat}
                 lng={this.props.editCam.lng}
                 // onClick={() => this._onClick(cam)}
                //  position={[this.props.editCam.lat, this.props.editCam.lng]}
                // lat={this.props.editCam.lat}
                // lng={this.props.editCam.lng}
                icon={iconcamera}
                 cam={{
                  ...this.props.editCam,
                  id: this.props.focusedCam,
                }}
               >
              </MarkerComponent>
            
            )}
            </MarkerClusterGroup>
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
  //   infoWindow: map.showInfoWindow,
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
  //   showInfoWindow,
  //   closeInfoWindow,
  //   closePrevStreaming,
})(withStyles(styles)(MapOffline))
