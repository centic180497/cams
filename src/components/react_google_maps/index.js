import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GoogleMap, Marker } from 'react-google-maps'

import { MAP_API_KEY } from '../../constant/constant_endpoint'

class ReactGoogleMaps extends Component {
  render() {
    return (
      <GoogleMap
        
      >
        {this.props.children}
      </GoogleMap>
    )
  }
}

const mapStateToProps = ({ cameras, map }) => ({
  cameras: cameras.cameras,
  fitBounds: map.fitBoundsMap,
})

export default connect(mapStateToProps)(ReactGoogleMaps)
