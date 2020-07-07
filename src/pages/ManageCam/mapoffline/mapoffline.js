import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mX.png'
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
// import { Tooltip } from '@material-ui/core'
import {
  focusOnCam,
  fetchCamLocationSuccess,
  changeCamLocation,
  cancelFocusedCam,
  getCameraLocation,
  fetchCamLocation,
  changeCamStatus,
  changingCamStatus,
} from '../../../actions/action_camera'
import NewCameaMarker from '../../../components/Marker/NewCameaMarker'
// import LiveView from '../LiveView'
import { isEmpty } from 'lodash'
import './style.css'
import { Typography } from '@material-ui/core'
import FullscreenControl from 'react-leaflet-fullscreen'
import { changeBoundsMap } from '../../../actions/action_map'
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: 'calc(100vh - 100px)',
    position:'sticky'
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
  handleClose() {
    this.props.cancelFocusedCam()
    this.props.focusOnCam({ id: this.props.focusedCam })
  }
  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }
  handleClick = (e) => {
    let lat = e.latlng.lat
    let lng = e.latlng.lng
    this.props.fetchCamLocation({ lat, lng })
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
    const possition = [15.87944, 108.335]
    const { center, zoom,defaultZoom } = this.props
    this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
    console.log(this.props.zoom, this.props.center)
    console.log(this.props.defaultZoom);
    
  }
  onViewportChanged = (viewport) => {
    console.log(viewport)
    this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  }
  render() {
    const { classes, cams, infoWindow } = this.props

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
        <Map
          center={this.props.center}
          zoom={this.props.zoom}
          className={classes.map}
          onClick={this.handleClick}
          onViewportChanged={this.onViewportChanged}
          // onClick={this.handleClick}
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
            {/* <Button className={classes.control} handlePortalClick={this.handlePortalClick()}></Button> */}
          </Portal>
          <FullscreenControl position="topright" />
          <TileLayer
            url="http://10.49.46.13:8081/styles/osm-bright/{z}/{x}/{y}.png"
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://centic.vn"> Centic</a>'
          />
          {cams.length > 0
            ? cams.map((cam, index) => {
                return (
                  <Marker
                    key={index}
                    // onClick={() => this._onClick(cam)}
                    position={[cam.lat, cam.lng]}
                    icon={iconcamera}
                    ref={
                      this.props.focusedCam && cam.id === this.props.focusedCam
                        ? this.openPopup
                        : this.closePopups
                    }
                  >
                    <Popup
                      onClose={() => this.handleClose(cam.id)}
                      // onClick={()=>this.handleClose()}
                      className={classes.Popup}
                    >
                      <Typography className={classes.markerCamName}>
                        {cam.name}
                      </Typography>
                      <Typography className={classes.markerCamName}>
                        {cam.address}
                      </Typography>
                      <Fragment>
                        <div className={classes.controls}>
                          <IconButton
                            className={classes.iconButton}
                            onClick={this.handleConfigsClick}
                          >
                            <SettingsIcon className={classes.icon} />
                          </IconButton>

                          <IconButton
                            className={classes.iconButton}
                            onClick={this.handleDelete}
                          >
                            <DeleteIcon className={classes.icon} />
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
                )
              })
            : null}
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

const mapStateToProps = ({ map, cameras }) => ({
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
  defaultZoom:map.defaultZoom
  //   infoWindow: map.showInfoWindow,
})
export default connect(mapStateToProps, {
  fetchCamLocation,
  focusOnCam,
  fetchCamLocationSuccess,
  cancelFocusedCam,
  changeCamStatus,
  changeBoundsMap,
  //   showInfoWindow,
  //   closeInfoWindow,
  //   closePrevStreaming,
})(withStyles(styles)(MapOffline))
