import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Icon } from 'leaflet'
import icon from 'assets/icon/mmx.png'
import { connect } from 'react-redux'
import './style.css'
import { Typography } from '@material-ui/core'
import 'assets/styles/components/_marker.scss'
import './marker.scss'
import classNames from 'classnames'
import { renderToStaticMarkup } from 'react-dom/server'
import { divIcon } from 'leaflet'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import {
  cancelFocusVehicleHistory,
  focusVehicleHistory,
  fetchVehicleHistory,
} from 'actions/action_blackList'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100vh',
  },
  map: {
    width: '100%',
    height: 'calc(100vh - 50px)',
  },
  Marker: {
    fontSize: '500px',
  },
  plate: {
    fontSize: 16,
    fontWeight: 500,
  },
  test: {
    marginLeft: '13px',
    width: '30px',
    height: '39px',
    marginTop: '13px',
    '&:hover': {
      transformStyle: 'preserve-3d',
      transition: '.3s ease-in-out',
      transform: 'scale(1.3)',
      transformOrigin: 'center',
    },
  },
  // Popup: {
  //   width: '400px',
  // },
  header: {
    display: 'flex',
    textAlign: 'right',
    marginLeft: 'auto',
    flexDirection: 'row',
    position: 'relative',
  },
  imgseach: {
    // display: 'block',
    // width: '100%',
    // height: 'auto',
    width: 'auto',
    maxWidth: '400px',
    minWidth: '200px',
    maxHeight: '600px',
  },
  icon: {
    fontSize: 14,
  },
  iconButton: {
    transformStyle: 'preserve-3d',
    position: 'absolute',
    right: 0,
    padding: 6,
  },
  markerCamName: {
    width: '100%',
    position: 'relative',
  },
  markerCamNameimg: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: '250px',
  },
  imgpopup: {
    minWidth: 'fit-content',
    // height: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    width: 'auto',
  },
})

class MarkerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  state = {
    livestream: false,
  }

  openPopup(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.openPopup()
    }
  }
  _onCloseInfoWindowClick = () => {
    this.setState({
      livestream: false,
    })
    this.closePopup()
    this.props.cancelFocusVehicleHistory({ id: -1 })
  }
  handleClose() {
    this.props.cancelFocusVehicleHistory()
    this.props.focusVehicleHistory(this.props.focusedVehicle)
  }
  closePopups(marker) {
    if (marker && marker.leafletElement) {
      marker.leafletElement.closePopup()
    }
  }
  closePopup() {
    if (this.ref.current && this.ref.current.leafletElement) {
      this.ref.current.leafletElement.options.leaflet.map.closePopup()
    }
  }
  myHandleImageLoadEvent=(event)=>{
    const url =event.target.src
    if(url){
      this.setState({
        imgLoad:true
      })
    }
    
  }
  render() {
    const {
      classes,
      cams,
      infoWindow,
      matchCams,
      focusedVehicle,
      cam,
    } = this.props
    const iconmaker = renderToStaticMarkup(
      <div
        className={classNames('marker-instance', {
          'cam-alert': this.props.matchCams.includes(cam.id),
        })}
      >
        <img
          className={classes.test}
          src={icon}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        />
      </div>,
    )
    const iconcamera = divIcon({
      iconSize: [30, 39],
      iconAnchor: [15, 39],
      popupAnchor: [0, -39],
      tooltipAnchor: [0, -39],
      html: iconmaker,
    })
    const isShowInfoWindow = _.get(focusedVehicle, 'camera.id') === cam.id
    return (
      <div className={classes.automarker}>
        <Marker
          position={[cam.lat, cam.lng]}
          icon={iconcamera}
          ref={isShowInfoWindow ? this.openPopup : this.closePopups}
          closePopupOnClick={true}
          direction={'right'}
        >
          <Popup
            direction={'right'}
            ref={this.ref}
            closeButton={false}
            // onClose={() => this.handleClose()}
            className={classes.Popup}
          >
            <div className={classes.header}>
              <IconButton
                className={classes.iconButton}
                onClick={this._onCloseInfoWindowClick}
              >
                <ClearOutlined className={classes.icon} />
              </IconButton>
            </div>
            <div className={classes.imgpopup}>
              <Typography noWrap className={classes.plate}>
                Biển số xe: {focusedVehicle.plate_number}
              </Typography>
              <Typography noWrap className={classes.camName}>
                {_.get(focusedVehicle, 'camera.name')}
              </Typography>
              <Typography noWrap className={classes.time}>
                {focusedVehicle.timestamp}
              </Typography>
              <Typography noWrap className={classes.address}>
                {focusedVehicle.address}
              </Typography>
              <div className={classes.markerCamNameimg}>
                <img
                  onLoad={(event) => this.myHandleImageLoadEvent(event)}
                  className={classes.imgseach}
                  src={'http://116.110.6.137:1085' + focusedVehicle.object_img}
                />
              </div>
            </div>
          </Popup>
          <Tooltip className={classes.Tooltip} direction={'top'}>
            <Typography align="center" className={classes.camName}>
              {cam.name}{' '}
            </Typography>
            <Typography align="center">{cam.address} </Typography>
          </Tooltip>
        </Marker>
      </div>
    )
  }
}

const mapStateToProps = ({ map, blackList }) => ({
  matchCams: blackList.vehicleHistory.matchCams,
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
})
export default connect(mapStateToProps, {
  cancelFocusVehicleHistory,
  focusVehicleHistory,
  fetchVehicleHistory,
})(withStyles(styles)(MarkerComponent))
