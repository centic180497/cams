import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import PinDrop from '@material-ui/icons/PinDrop'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import { MAP_API_KEY } from '../../constant/constant_endpoint'
import MapControl from '../MapControl'
import _ from 'lodash'

const styles = theme => ({
  fitButton: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 40,
    userSelect: 'none',
    outline: 'none',
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px',
    cursor: 'pointer',
    right: 10,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  icon: {
    fontSize: 18,
    color: '#666',
  },
})

const getMapBounds = (map, maps, cameras) => {
  const bounds = new maps.LatLngBounds()
  cameras.map(cam => {
    bounds.extend(new maps.LatLng(cam.lat, cam.lng))
  })
  return bounds
}

const apiIsLoaded = (map, maps, cameras) => {
  if (cameras.length > 0) {
    const bounds = getMapBounds(map, maps, cameras)
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      let extendPoint1 = new maps.LatLng(
        bounds.getNorthEast().lat() + 0.01,
        bounds.getNorthEast().lng() + 0.01,
      )
      let extendPoint2 = new maps.LatLng(
        bounds.getNorthEast().lat() - 0.01,
        bounds.getNorthEast().lng() - 0.01,
      )
      bounds.extend(extendPoint1)
      bounds.extend(extendPoint2)
    }
    map.fitBounds(bounds)
  }
}
class GoogleMap extends Component {
  state = {
    mapControlShouldRender: false,
  }
  componentWillUnmount() {
    this.setState({
      mapControlShouldRender: false
    })
  }
  componentDidUpdate(prevProps) {
    const { cameras = [] } = this.props
    const arrCams = cameras.map(cam => cam.id)
    const prevArrCams = prevProps.cameras.map(cam => cam.id)

    if (
      prevProps.cameras.length > 0 &&
      this.props.cameras.length > 0 &&
      !_.isEqual(arrCams, prevArrCams)
    ) {
      apiIsLoaded(this.map, this.maps, cameras)
    }
  }

  handleClick = () => {
    const { cameras } = this.props
    apiIsLoaded(this.map, this.maps, cameras)
  }
  render() {
    const { classes, cameras = [] } = this.props
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAP_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          console.log('map loaded')
          apiIsLoaded(map, maps, cameras)
          this.map = map
          this.maps = maps
          // we need this setState to force the first mapcontrol render
          this.setState({ mapControlShouldRender: true })
        }}
        {...this.props}
      >
        <MapControl
          map={this.map || null}
          controlPosition={
            this.maps ? this.maps.ControlPosition.RIGHT_BOTTOM : null
          }
        >
          <button className={classes.fitButton} onClick={this.handleClick}>
            {/* <PinDrop className={classes.icon} /> */}
          </button>
        </MapControl>
        {this.props.children}
      </GoogleMapReact>
    )
  }
}

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

GoogleMap.defaultProps = {
  children: null,
}

const mapStateToProps = ({ cameras, map }) => ({
  cameras: cameras.cameras,
  fitBounds: map.fitBoundsMap,
})

export default connect(mapStateToProps)(withStyles(styles)(GoogleMap))
