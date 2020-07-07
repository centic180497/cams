import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import {
  workerFetchAllCams, 
  workerInitSearchCam, 
  workerSearchCam,
  workerChangeSearchCamParams,
  workerClearProvince,
  workerClearDistrict,
  workerDeleteCam,
  workerConnectToCam,
  workerConfigCamParams,
  workerConfigCamFunctions,
  workerFetchCamConnection,
  workerEditCamConnection,
  workerFetchCamParams,
  workerEditCamParams,
  workerFetchCamFunctions,
  workerEditCamFunctions,
  workerChangeCamStatus,
  workerFetchCamSnapshot,

  workerFetchStreamingCam,
  workerFetchCamRecordVideos,
  workerFetchCamGroup
} from './camera_saga'

export default function* watchCamera(){
  //fetch all cameras
  yield takeEvery(types.FETCH_ALL_CAMS, workerFetchAllCams)
  // init search cam
  yield takeEvery(types.INIT_SEARCH_CAM, workerInitSearchCam)
  // search cam
  yield takeEvery(types.SEARCH_CAMERA, workerSearchCam)
  // change search cam params
  yield takeEvery(types.CHANGE_SEARCH_CAM_PARAMS, workerChangeSearchCamParams)
  //clear province
  yield takeEvery(types.CLEAR_PROVINCE, workerClearProvince)
  //clear district
  yield takeEvery(types.CLEAR_DISTRICT, workerClearDistrict)
  //delete camera
  yield takeEvery(types.DELETE_CAM, workerDeleteCam)
  // connect camera
  yield takeEvery(types.CONNECT_TO_CAM, workerConnectToCam)
  // config camera's params
  yield takeEvery(types.CONFIG_CAM_PARAMS, workerConfigCamParams)
  // config camera's functions
  yield takeEvery(types.CONFIG_CAM_FUNCTIONS, workerConfigCamFunctions)
  //fetch camera connection
  yield takeEvery(types.FETCH_CAM_CONNECTION, workerFetchCamConnection)
  // edit camera connection
  yield takeEvery(types.EDIT_CAM_CONNECTION, workerEditCamConnection)
  // fetch camera's params
  yield takeEvery(types.FETCH_CAM_PARAMS, workerFetchCamParams)
  // edit camera's params
  yield takeEvery(types.EDIT_CAM_PARAMS, workerEditCamParams)
  // fetch camera's functions
  yield takeEvery(types.FETCH_CAM_FUNCTIONS, workerFetchCamFunctions)
  //edit camera's functions
  yield takeEvery(types.EDIT_CAM_FUNCTIONS, workerEditCamFunctions)
  // change camera's status
  yield takeEvery(types.CHANGE_CAM_STATUS, workerChangeCamStatus)
  // fetch camera snapshot
  yield takeEvery(types.FETCH_CAM_SNAPSHOT, workerFetchCamSnapshot)
  // fetch streaming cam
  yield takeEvery(types.FETCH_STREAMING_CAM, workerFetchStreamingCam)
  // fetch camera record videos
  yield takeEvery(types.FETCH_CAM_RECORD_VIDEOS, workerFetchCamRecordVideos)

  yield takeEvery(types.FETCH_CAMERA_GROUP, workerFetchCamGroup)
}