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
  test: {
    marginLeft: '13px',
    width: '30px',
    height: '39px',
    marginTop: '13px',
    '&:hover': {
      width: '38px',
      height: '38px',
      zIndex: 2,
      transformStyle: 'preserve-3d',
    },
  },
  header: {
    display: 'flex',
    textAlign: 'right',
    marginLeft: 'auto',
    flexDirection: 'row',
    position: 'relative',
    right: 0,
    top:'-5px'
  },
  icon: {
    fontSize: 14,
  },
  iconButton1: {
    transformStyle: 'preserve-3d',
    position: 'absolute',
    right: 0,
    padding: 4,
 
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
})
const iconcamera = new Icon({
  iconUrl: icon,
  iconSize: [30, 39],
  iconAnchor: [15, 39],
  popupAnchor: [0, -39],
})

class MarkerComponent extends React.Component {
  constructor(props){
    super(props);
    this.ref = React.createRef();
}
state = {
  livestream: false
}
  _onClick = (cam) => {
    const { lat, lng, id } = this.props.cam
    this.props.focusOnCam({
      center: { lat, lng },
      zoom: 15,
      id,
    })
  
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  handleClose() {
    this.props.cancelFocusedCam()
    this.props.focusOnCam({ id: this.props.focusedCam })
  }
  closePopups() {
    if (this.ref.current && this.ref.current.leafletElement) {
      this.ref.current.leafletElement.options.leaflet.map.closePopup()
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
  _onClose=()=>{
    this.closePopups()
    this.setState({
      livestream: false,
    })
    this.props.cancelFocusedCam({id:-1})
  }
  handleDelete = (event, cam) => {
    event.stopPropagation()
    this.props.showDeleteCamModal(cam)
  }
  render() {
    const { classes, cams, infoWindow,cam,lat,lng } = this.props
    const iconmaker = renderToStaticMarkup(
      <div
        className={classNames('marker-instance', {
        })}
      >
        <img className={classes.test} src={icon} />
      </div>,
    )
    const iconcamera = divIcon({
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker,
    })

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
  
           <Marker 
                      onClick={() => this._onClick(cam,lat,lng)}
                      position={[lat,lng]}
                      icon={iconcamera}
                      ref={
                        this.props.focusedCam &&
                        cam.id === this.props.focusedCam
                          ? this.openPopup
                          : null
                      }
                    >
                      <Popup
                        ref={this.ref}
                       closeButton	={false}
                        className={classes.Popup}
                      >
                         <div className={classes.header}>
                          <IconButton className={classes.iconButton1} onClick={this._onClose}>
                            <ClearOutlined className={classes.icon} />
                          </IconButton>
                        </div>
                        <Typography noWrap className={classes.markerCamName}>
                          {cam.name}
                        </Typography>
                        <Typography noWrap className={classes.markerCamName}>
                          {cam.address}
                        </Typography>
                        <Fragment>
                          <div className={classes.controls}>
                            <IconButton
                              className={classes.iconButton}
                              onClick={(e) => this.handleConfigsClick(e, cam)}
                            >
                              <SettingsIcon className={classes.icon} />
                            </IconButton>

                            <IconButton
                              className={classes.iconButton}
                              onClick={(e) => this.handleDelete(e, cam)}
                            >
                              <DeleteIcon clas
                              sName={classes.icon} />
                            </IconButton>

                            {cam.id === this.props.changingCamStatus ? (
                              <div className={classes.process}>
                                <CircularProgress size={16} />
                              </div>
                            ) : (
                              <Switch
                                color="primary"
                                size="small"
                                checked={cam.status !== 'disabled'}
                                onChange={this._onSwitchChange(
                                  cam.id,
                                  cam.status,
                                )}
                              />
                            )}
                          </div>
                        </Fragment>
                      </Popup>

                      <Tooltip className={classes.Tooltip} direction={'top'}>
                        <Typography align="center" className={classes.camName}>
                          {' '}
                          {cam.name}
                        </Typography>
                        <Typography align="center"> </Typography>
                      </Tooltip>
                    </Marker>
               
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
  configCam: configCam,
  showDeleteCamModal,
})(withStyles(styles)(MarkerComponent))
