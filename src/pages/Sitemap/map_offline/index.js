import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mX.png'
import { showInfoWindow, closeInfoWindow } from '../../../actions/action_map'
import { closePrevStreaming } from '../../../actions/action_streaming'
import { connect } from 'react-redux'
import LiveView from '../LiveView'
import './style.css'
import { Typography } from '@material-ui/core'
import FullscreenControl from 'react-leaflet-fullscreen'
import { Portal } from 'react-leaflet-portal'
import {changeBoundsMap} from 'actions/action_map'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
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
  // Popup:{
  //   width: '480px !important',
  // },
  // video:{
  //   width:'100%',
  //   maxWidth:480
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
    this.state = {
      cams: [
        {
          address: ' Hòa Khê,  Thanh Khê,  Đà Nẵng',
          id: '5ed7274f94d0787eb85f35df',
          ip: '10.49.24.14',
          is_in_followlist: true,
          lat: 16.059392,
          lng: 108.186097,
          name: 'Camera 1 - Huỳnh Ngọc Huệ',
          status: 'enabled',
        },
        {
          address: ' Hòa Khê,  Thanh Khê,  Đà Nẵng',
          id: '5ed7277b94d0787eb85f35e0',
          ip: '10.49.24.14',
          is_in_followlist: true,
          lat: 16.061243,
          lng: 108.186007,
          name: 'Camera 2 - Huỳnh Ngọc Huệ',
          status: 'enabled',
        },
        {
          address: ' Hòa Khê,  Thanh Khê,  Đà Nẵng',
          id: '5ed727a294d0787eb85f35e1',
          ip: '10.49.24.14',
          is_in_followlist: true,
          lat: 16.059132,
          lng: 108.185999,
          name: 'Camera 3 - Hà Huy Tập',
          status: 'enabled',
        },
        {
          address: ' Hòa Khê,  Thanh Khê,  Đà Nẵng',
          id: '5ed727c294d0787eb85f35e2',
          ip: '10.49.24.14',
          is_in_followlist: true,
          lat: 16.059222,
          lng: 108.186154,
          name: 'Camera 4 - Hà Huy Tập',
          status: 'enabled',
        },
        {
          address: ' Hòa Khê,  Thanh Khê,  Đà Nẵng',
          id: '5ed728bb94d0787eb85f35e3',
          ip: '10.49.24.14',
          is_in_followlist: true,
          lat: 16.059229,
          lng: 108.186005,
          name: 'Camera 5 - Giám sát nút',
          status: 'enabled',
        },
      ],
      currentPos: null,
    }
    this.handleClick = this.handleClick.bind(this)
  }
  // _onMarkerClick = (item) => {
  //   console.log(item.lat)
  //   const { infoWindow } = this.props
  // }

  _onClick = ({ id, lat, lng }) => {
    const { infoWindow } = this.props
    if ((infoWindow !== -1) & (infoWindow !== id)) {
      this.props.closePrevStreaming(infoWindow)
    }
    if (infoWindow !== id) {
      this.props.showInfoWindow({
        center: { lat, lng },
        id,
      })
    }
  }
  // onViewportChanged = (viewport) => {
  //   console.log(viewport)
  //   this.props.changeBoundsMap({ center: viewport.center, zoom: viewport.zoom })
  // }
  // handlePortalClick = () => {
  //   const possition = [15.87944, 108.335]
  //   const { center, zoom, defaultZoom } = this.props
  //   this.props.changeBoundsMap({ center: center, zoom: defaultZoom })
  //   console.log(this.props.zoom, this.props.center)
  //   console.log(this.props.defaultZoom)
  // }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  handleClose(id) {
    // this.props.showInfoWindow({ id: -1 })
    this.props.closeInfoWindow(id)
  }

  handleClick(e) {
    console.log('e ne', e)
    this.setState({ currentPos: e.latlng })
  }

  render() {
    const { classes, cams, infoWindow } = this.props
    console.log(infoWindow)

    const possition = [15.87944, 108.335]
    return (
      <div className={classes.root}>
        <Map
          center={possition}
          zoom={13}
          className={classes.map}
          onClick={this.handleClick}
          // onViewportChanged={this.onViewportChanged}
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
                  position="right"
                    key={index}
                    onClick={() => this._onClick(cam)}
                    position={[cam.lat, cam.lng]}
                    icon={iconcamera}
                    ref={
                      infoWindow && cam.id === infoWindow
                        ? this.openPopup
                        : null
                    }
                  >
                    <Popup
      
                      onClose={() => this.handleClose(cam.id)}
                      className={classes.Popup}
                    >
                      <Typography className={classes.markerCamName}>
                        {cam.name}
                      </Typography>
                      <LiveView id={cam.id} className={classes.video}/>
                    </Popup>

                    <Tooltip className={classes.Tooltip} direction={'top'}>
                      <Typography align="center" className={classes.camName}>
                        {' '}
                        {cam.name}{' '}
                      </Typography>
                      <Typography align="center"> {cam.address} </Typography>
                    </Tooltip>
                  </Marker>
                )
              })
            : null}
        </Map>
      </div>
    )
  }
}

const mapStateToProps = ({ map }) => ({
  infoWindow: map.showInfoWindow,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
})
export default connect(mapStateToProps, {
  showInfoWindow,
  closeInfoWindow,
  closePrevStreaming,
  changeBoundsMap,
})(withStyles(styles)(MapOffline))
