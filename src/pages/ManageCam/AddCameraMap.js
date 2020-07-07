import React, { Component, lazy } from 'react';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { getCameraLocation, changeAddCameraParams } from '../../actions/action_camera'
import GoogleMap from '../../components/GoogleMap'
import NewCameraMarker from '../../components/Marker/NewCameaMarker'

class AddCameraMap extends Component{
  state = {
    center: {
      lat: 16.036308499726402,
      lng: 108.20592484212307
    },
    zoom: 13,
  }
  getCoordinates = ({ x, y, lat, lng, event }) => {
    this.props.changeAddCameraParams({lat, lng})
    this.props.getCameraLocation({lat, lng})
  }
  render(){
    const { newCameraPosition } = this.props
    return (
      <div style={{width: '100%', height: '100%'}}>
        <GoogleMap
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onClick={this.getCoordinates}
        >
          {!isEmpty(newCameraPosition) &&
            <NewCameraMarker
              lat={newCameraPosition.lat}
              lng={newCameraPosition.lng}
            />
          }
        </GoogleMap>
      </div>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  cameras: cameras.cameras,
  newCameraPosition: {
    lat: cameras.addCamera.lat,
    lng: cameras.addCamera.lng
  },
})

export default connect(mapStateToProps, {
  changeAddCameraParams: changeAddCameraParams,
  getCameraLocation: getCameraLocation
})(AddCameraMap)