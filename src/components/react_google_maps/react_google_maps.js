import React from 'react'
import { compose, withProps } from 'recompose'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'

class ReactGoogleMaps extends React.Component {
  render() {
    const Map = compose(
      withProps({
        googleMapURL: '',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div style={{ height: '100%' }} />,
        mapElement: <div style={{ height: '100%' }} />,
      }),
      withScriptjs,
      withGoogleMap,
    )(props => <GoogleMap defaultZoom={13} defaultCenter={{ lat: 16.081187, lng: 108.211631 }}></GoogleMap>)

    return <Map />
  }
}

export default ReactGoogleMaps
