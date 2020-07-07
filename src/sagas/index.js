import { all, fork } from 'redux-saga/effects'
import watchUserAuthtication from './authentication_watcher'
import watchCamera from './camera_watcher'
import watchFollowList from './followList_watcher'
import watchPolitical from './political_watcher'
import watchVehicle from './vehicle_watcher'
import watchMap from './map_watcher'
import watchBlackList from './blackList_watcher'
import watchNotification from './notification_watcher'
import watchViolations from './violations_watcher'
import watchRecordVideo from './record_video_watcher'
import watchFlow from './flow_watcher'
import watchTrafficControl from './trafficControl_watcher'
import watchLightPeriodChart from './lightPeriodChart_watcher'

import {
  // watchConnectCamera,
  // watchConfigParams,
  // watchConfigFunctions,
  watchChangeSearchCamParams,
  // watchClearProvince,
  // watchClearDistrict,
  // watchSearchCam,
  // watchGetCamConnection,
  // watchChangeCamConnectionParams,
  // watchEditCamConnection,
  // watchGetCamParams,
  // watchEditCamParams,
  // watchGetCamSnapshot,
  watchAddCamToFollowList,
  watchRemoveCamFromFollowList,
  // watchFetchAllCams,
} from './saga_camera'

import {
  watchGetAllProvinces,
  watchChangeCameraParams,

  // watchClearProvince,
  // watchClearDistrict,
} from './saga_political'
import { connectStream } from './saga_sitemap'
import {
  watchGetDataBeforeConnect,
  // watchGetDataBeforeSearch,
} from './saga_manageCam'

export default function* rootSaga() {
  yield all([
    // auth
    fork(watchUserAuthtication),
    // camera
    fork(watchCamera),
    // follow list and stream
    fork(watchFollowList),
    // political
    fork(watchPolitical),
    // vehicle
    fork(watchVehicle),
    // map
    fork(watchMap),
    // black list
    fork(watchBlackList),
    // notification
    fork(watchNotification),
    // violations
    fork(watchViolations),
    // record video
    fork(watchRecordVideo),
    // flow
    fork(watchFlow),
    // traffic control
    fork(watchTrafficControl),
    // light period chart
    fork(watchLightPeriodChart),
    // fork(watchConnectCamera),
    // fork(watchConfigParams),
    // fork(watchConfigFunctions),
    // fork(watchSearchCam),
    // fork(watchGetCamConnection),
    // fork(watchChangeCamConnectionParams),
    // fork(watchEditCamConnection),
    // fork(watchGetCamParams),
    // fork(watchEditCamParams),
    // fork(watchGetCamSnapshot),
    // fork(watchAddCamToFollowList),
    // fork(watchRemoveCamFromFollowList),
    // fork(watchFetchAllCams),
    //modal
    // fork(watchShowEditModal),
    // fork(watchCloseModal),
    // fork(watchShowDeleteModal),
    //map
    // fork(watchGetCameraLocation),
    // fork(watchChangeCamLocation),
    //political
    fork(watchGetAllProvinces),
    fork(watchChangeCameraParams),
    // fork(watchClearProvince),
    // fork(watchClearDistrict),

    // fork(connectStream),
    //manageCam
    // fork(watchGetDataBeforeSearch),
    fork(watchGetDataBeforeConnect),
    //search
    // fork(watchChangeSearchCamParams),

    //search vehicles
    // fork(watchSearchVehicles)
  ])
}
