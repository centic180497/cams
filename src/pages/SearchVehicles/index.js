import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { fetchAllCams } from '../../actions/action_camera'
import Search from './Search'
import GoogleMap from '../../components/GoogleMap'
import SearchResult from './SearchResult'
import Marker from './Marker'
import { changeBoundsMap } from '../../actions/action_map'
import MapOffline from './components/map_offline/index'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  left: {
    width: 320,
    zIndex: 4,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '5px 0 5px -5px #333',
  },
  right: {
    flexGrow: 1,
  },
})

class SearchVehicles extends Component {
  componentDidMount() {
    this.props.fetchAllCams()
  }

  _onBoundsChange = ({ center, zoom, bounds, marginBounds }) => {
    this.props.changeBoundsMap({ center, zoom })
  }
  
  render() {
    const {
      classes,
      cams = [],
      center = {},
      defaultZoom,
      zoom,
      matchCams = [],
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <Search />
          <SearchResult />
        </div>
        <div className={classes.right}>
          <MapOffline cams={this.props.cams}/>
          {/* <GoogleMap
            center={center}
            defaultZoom={defaultZoom}
            zoom={zoom}
            onChange={this._onBoundsChange}
          >
            {cams.map((cam, index) => (
              <Marker
                lat={cam.lat}
                lng={cam.lng}
                detail={cam}
                key={cam.id}
                isMatching={matchCams.includes(cam.id)}
              />
            ))}
          </GoogleMap> */}

        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, map, searchVehicles }) => ({
  cams: cameras.cameras,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  matchCams: searchVehicles.matchCams,
})

export default connect(
  mapStateToProps,
  { fetchAllCams, changeBoundsMap },
)(withStyles(styles)(SearchVehicles))
