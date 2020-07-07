import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import GoogleMap from 'components/GoogleMap'
import { fetchVehicleHistory } from 'actions/action_blackList'
import styles from './styles'
import { CircularProgress  } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'
import { fetchAllCams } from 'actions/action_camera'
import VehicleHistoryItem from '../VehicleHistoryItem'
import MapOffline from '../mapoffline/mapoffline'

// import Marker from 'pages/SearchVehicles/Marker'
import Marker from '../Marker'

class VehicleHistory extends Component {

  componentDidMount() {
    this.props.fetchVehicleHistory({
      string: this.props.match.params.plateNumber,
      page: 1,
      filter: 'blacklist',
    })
    this.props.fetchAllCams()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.plateNumber !== this.props.match.params.plateNumber ||
      prevProps.location.search !== this.props.location.search
    ) {
      this.props.fetchVehicleHistory({
        string: this.props.match.params.plateNumber,
        page: 1,
        filter: 'blacklist',
      })
    }
  }

  render() {
    const {
      classes,
      cams = [],
      center = {},
      defaultZoom,
      zoom,
      isFetching,
      vehicles,
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          {isFetching ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : (
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <div className={classes.wrapper}>
                {vehicles.map((vehicle, index) => (
                  <VehicleHistoryItem key={index} data={vehicle} />
                ))}
              </div>
            </Scrollbars>
          )}
        </div>
        <div className={classes.right}>
          {/* <GoogleMap center={center} defaultZoom={defaultZoom} zoom={zoom}>
            {cams.map((cam, index) => (
              <Marker lat={cam.lat} lng={cam.lng} data={cam} key={index} />
            ))}
          </GoogleMap> */}
          <MapOffline cams={this.props.cams}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ map, blackList, cameras }) => ({
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  cams: cameras.cameras,
  vehicles: blackList.vehicleHistory.data,
  isFetching: blackList.vehicleHistory.api.pending,
})

export default withRouter(
  connect(
    mapStateToProps,
    { fetchVehicleHistory, fetchAllCams },
  )(withStyles(styles)(VehicleHistory)),
)
