import React, { Component, lazy, Suspense, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { isEmpty } from 'lodash'
import GoogleMap from '../../components/GoogleMap'
import { changeBoundsMap } from '../../actions/action_map'
import NewCameaMarker from '../../components/Marker/NewCameaMarker'
import {
  focusedCam,
  changeCamLocation,
  getCameraLocation,
  fetchCamLocation,
} from '../../actions/action_camera'
// import { MarkerCam } from '../../components/Marker'
import MarkerCam from './MarkerCam'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
})

class RightSite extends Component {
  // apiHasLoaded = (map, maps) => {
  //   this.setState({
  //     mapApiLoaded: true,
  //     mapInstance: map,
  //     mapApi: maps
  //   })
  // }
  _onChange = ({ center, zoom, bounds, marginBounds }) => {
    this.props.changeBoundsMap({ center, zoom })
  }

  _onMapClick = ({ x, y, lat, lng, event }) => {
    const { isEditingCam, isAddingCam } = this.props
    if (isEditingCam) { 
      this.props.changeCamLocation({ lat, lng })
      // this.props.fetchCamLocation({ lat, lng })
    }
    if (isAddingCam) {
      // this.props.getCameraLocation({ lat, lng })
      this.props.fetchCamLocation({lat, lng})
    }
  }

  render() {
    const {
      center,
      zoom,
      defaultZoom,
      focusedCam,
      siteState,
      isEditingCam,
      cameras,
      newCamCoor,
      editCam,
    } = this.props
    return (
      <Fragment>
        {siteState === 0 && (
          <GoogleMap
            center={center}
            zoom={zoom}
            defaultZoom={defaultZoom}
            onChange={this._onChange}
            onClick={this._onMapClick}
          >
            {cameras &&
              cameras.map((cam, index) => {
                if (cam.id === focusedCam && isEditingCam) return null
                return (
                  <MarkerCam
                    lat={cam.lat}
                    lng={cam.lng}
                    key={index}
                    detail={cam}
                    // onClick={this._onMarkerClick}
                  />
                )
              })}
            {!isEmpty(newCamCoor) && (
              <NewCameaMarker lat={newCamCoor.lat} lng={newCamCoor.lng} />
            )}
            {isEditingCam && focusedCam !== -1 && (
              <MarkerCam
                lat={editCam.lat}
                lng={editCam.lng}
                detail={{
                  ...editCam,
                  id: focusedCam,
                }}
              />
            )}
          </GoogleMap>
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = ({ cameras, manageCam, map }) => ({
  cameras: cameras.cameras,
  siteState: manageCam.rightSiteState,
  defaultZoom: map.defaultZoom,
  center: map.center,
  zoom: map.zoom,
  focusedCam: cameras.focusedCam,
  // currentCamId: cameras.currentCam.id,
  editCam: cameras.editCam.connection,
  isEditingCam: map.isEditingCam,
  isAddingCam: map.isAddingCam,
  newCamCoor: {
    lat: cameras.addCamera.lat,
    lng: cameras.addCamera.lng,
  },
})

export default connect(
  mapStateToProps,
  {
    changeBoundsMap: changeBoundsMap,
    changeCamLocation: changeCamLocation,
    getCameraLocation: getCameraLocation,
    fetchCamLocation
  },
)(withStyles(styles)(RightSite))
