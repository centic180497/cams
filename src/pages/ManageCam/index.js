import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Loading from '../../components/Loading'
// import MarkerInstance from '../Sitemap/MarkerInstance'
import { MarkerCam } from '../../components/Marker'
import { changeBoundsMap } from '../../actions/action_map'
import { 
  focusOnCam, 
  changeCamLocation, 
  getCameraLocation,
  clearCamState,
} from '../../actions/action_camera'
import { switchTab } from '../../actions/action_manageCam'
import NewCameaMarker from '../../components/Marker/NewCameaMarker';

const GoogleMap = lazy(() => import('../../components/GoogleMap'))
const Filter = lazy(() => import('./Filter'))
const AddCamera = lazy(() => import('./AddCamera'))
const EditCamera = lazy(() => import('./EditCamera'))
const RightSite = lazy(() => import('./RightSite'))
const MapOffline=lazy(()=>import('./mapoffline/mapoffline'))

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '0',flexGrow: '1' }}>
      {children}
    </Typography>
  );
}
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  left: {
    width: 400,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    zIndex:3,
    height: '100%',
    boxShadow: '5px 0 5px -5px #333',
    overflow: 'hidden',
  },
  right: {
    // width: 'calc(100% - 400px)',
    flexGrow: 1,
    height: '100%'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height:'100%'
  },
  tab: {
    width: '33.333333%',
    minWidth: 130
  }

})

class ManageCam extends Component{
  state = {
    // value: 0,
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    camPosition: [],
    activeStep: 0,
  }

  componentWillUnmount() {
    this.props.clearCamState()
  }

  // apiHasLoaded = (map, maps) => {
  //   this.setState({
  //     mapApiLoaded: true,
  //     mapInstance: map,
  //     mapApi: maps
  //   })
  // }

  handleChange = (event, value) => {
    // console.log(event, value)
    // this.setState({ value });
    this.props.switchTab(value)
    
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  _onChange = ({ center, zoom, bounds, marginBounds }) => {
    this.props.changeBoundsMap({center, zoom})
  }
  _onMarkerClick = ({lat, lng, id}, event) => {
    event.stopPropagation()
    this.setState({
      value: 1
    })
    this.props.focusOnCam({
      center: { lat, lng },
      zoom: 15,
      id
    })
  }
  getCoordinates = ({ x, y, lat, lng, event }) =>{
    const { isEditingCam, isAddingCam } = this.props
    if(isEditingCam) this.props.changeCamLocation({ lat, lng })
    if(isAddingCam) this.props.getCameraLocation({ lat, lng })
  }

  render(){
    const { 
      classes,
      theme, 
      center,
      defaultZoom,
      zoom,
      tabValue, 
      rightSiteState,
      currentCamId,
      editCam,
      isEditingCam,
      newCamCoor,
    } = this.props;
    
    return(
      <div className={classes.root}>
        <div className={classes.left}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Danh sách" className={classes.tab} />
              <Tab label="Cấu hình" className={classes.tab}/>
              <Tab label="Thêm mới" className={classes.tab}/>
            </Tabs>
          </AppBar>
          <Suspense fallback={<Loading />}>
            {tabValue === 0 && 
              <TabContainer dir={theme.direction}>
                <div className={classes.wrapper}>
                  <Filter />
                </div>
              </TabContainer>}
            {tabValue === 1 && 
              <TabContainer dir={theme.erver}>
                <div className={classes.wrapper}>
                  <EditCamera />
                </div>
              </TabContainer>}
            {tabValue === 2 && 
              <TabContainer dir={theme.erver}>
                <div className={classes.wrapper}>
                  <AddCamera />
                </div>
              </TabContainer>}
          </Suspense>
        </div>
        <div className={classes.right}>
          <Suspense fallback={<Loading />}>
            {/* <RightSite /> */}
            <MapOffline/>
          </Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({cameras, map, manageCam}) => ({
  tabValue: manageCam.tabValue,
  rightSiteState: manageCam.rightSiteState,
  cameras: cameras.cameras,
  center: map.center,
  defaultZoom: map.defaultZoom,
  zoom: map.zoom,
  isEditingCam: map.isEditingCam,
  isAddingCam: map.isAddingCam,
  currentCamId : cameras.currentCam.id,
  editCam: cameras.editCam,
  newCamCoor: {
    lat: cameras.addCamera.lat,
    lng: cameras.addCamera.lng
  }
})

export default withRouter(connect(mapStateToProps, {
  changeBoundsMap,
  focusOnCam,
  switchTab, 
  changeCamLocation,
  getCameraLocation,
  clearCamState,
  
})(withStyles(styles, { withTheme: true })(ManageCam)))