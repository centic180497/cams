import { combineReducers } from 'redux'
import reducer_user from './reducer_auth'
import reducer_modal from './reducer_modal'
import reducer_ui from './reducer_ui'
import reducer_camera from './reducer_camera'
import reducer_map from './reducer_map'
import reducer_followList from './reducer_followList'
import reducer_manageCam from './reducer_manageCam'
import reducer_snackbar from './reducer_snackbar'
import reducer_political from './reducer_political'
import reducer_search from './reducer_search'
import reducer_searchVehicles from './reducer_searchVehicles'
import reducer_blackList from './reducer_blackList'
import navigationReducer from './reducer_navigation'
import notificationReducer from './reducer_notifications'
import violationsReducer from './reducer_violations'
import recordVideosReducer from './reducer_recordVideos'
import flowReducer from './reducer_flow'
import trafficControlReducer from './reducer_trafficControl'
import lightPeriodReducer from './reducer_lightPeriod'

const reducer_root = combineReducers({
  user: reducer_user,
  modal: reducer_modal,
  ui: reducer_ui,
  cameras: reducer_camera,
  map: reducer_map,
  followList: reducer_followList,
  manageCam: reducer_manageCam,
  political: reducer_political,
  snackbar: reducer_snackbar,
  search: reducer_search,
  searchVehicles: reducer_searchVehicles,
  blackList: reducer_blackList,
  navigation: navigationReducer,
  notification: notificationReducer,
  violations: violationsReducer,
  recordVideos: recordVideosReducer,
  flow: flowReducer,
  trafficControl: trafficControlReducer,
  lightPeriod: lightPeriodReducer
})

export default reducer_root
