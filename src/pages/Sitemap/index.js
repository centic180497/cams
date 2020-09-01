import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import _ from 'lodash'
import GoogleMap from '../../components/GoogleMap'
import MapOffline from "./map_offline" 
import Marker from './Marker'
import Search from './Search'
import SearchCam from './SearchCam'
import SearchResult from './SearchResult'
import { clearCamState, initSearchCam } from '../../actions/action_camera'
import { changeBoundsMap } from '../../actions/action_map'

const styles = theme => ({
  root: {
    position: 'relative',
    display: 'flex',
  },
  mapWrapper: {
    width: '100%',
    height: 'calc(100vh - 50px)',
    position: 'relative',
  },
  mapWraperWithFiller: {
    width: 'calc(100% - 400px)',
    height: 'calc(100vh - 50px)',
    position: 'relative',
  },
  filterWrapper: {
    width: 400,
    height: 'calc(100vh - 50px)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-5px 0 5px -5px #333;',
  },
  hideFilterWrapper: {
    width: 0,
    display: 'none',
  },
})

class SitemapPage extends Component {
  constructor(props){
    super(props);
    this.state={
      ShowPopup:'',
      ItemCamera:'',
    };
 
  }

  componentDidMount(){
    this.props.initSearchCam()
  }

  _onBoundsChange = ({ center, zoom, bounds, marginBounds }) => {
    this.props.changeBoundsMap({ center, zoom })
  }

  _onClick = (item) => {
    console.log('map-onclick',item)


  }
  
  

  _onChildClick = (key, childProps) => {
    // console.log(childProps)
  }

  componentWillUnmount() {
    this.props.clearCamState()
  }

  render() {
    const {
      classes,
      cameraFilterSidebar,
      cams = [],
      center = {},
      defaultZoom,
      zoom,
    } = this.props
    
    return (
      <div className={classes.root}>
        <div
          className={
            cameraFilterSidebar
              ? classes.mapWraperWithFiller
              : classes.mapWrapper
          }
        >
          {
            !cameraFilterSidebar ? <MapOffline
            onClick={this._onClick}
            cams={cams}
          >
          </MapOffline>:null
          }
          <MapOffline
            onClick={this._onClick}
            cams={cams}
          >
          </MapOffline>
        </div>
        <div
          className={classNames(classes.filterWrapper, {
            [classes.hideFilterWrapper]: !cameraFilterSidebar,
          })}
        >
          {cameraFilterSidebar && (
            <Fragment>
              <Search />
              <SearchResult   onClick={this.onClick}/>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, map, ui }) => ({
  cams: cameras.cameras,
  isLoading: cameras.isLoading,
  infoWindow: map.showInfoWindow,
  cameraFilterSidebar: ui.cameraFilterSidebar,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      changeBoundsMap,
      clearCamState,
      initSearchCam
    },
  )(withStyles(styles)(SitemapPage)),
)
