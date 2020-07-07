import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export function clearCameraErrors() {
  return {
    type: types.CLEAR_CAMERA_ERRORS,
  }
}

export function getCameraLocations({ id }) {
  return {
    type: types.GET_CAMERA_LOCATIONS,
    id,
  }
}
export function getCameraLocationsSuccess(locations, provinces, districts, communes) {
  return {
    type: types.GET_CAMERA_LOCATIONS_SUCCESS,
    locations,
    provinces,
    districts,
    communes,
  }
}

// export function editCameraLocations({id}, data){
//   return {
//     type: types.EDIT_CAMERA_LOCATIONS,
//     id,
//     data
//   }
// }

export function getProvincesAvailable() {
  return {
    type: types.GET_PROVINCES_AVAILABLE,
  }
}

export function getProvincesAvailableSuccess(provinces) {
  return {
    type: types.GET_PROVINCES_AVAILABLE_SUCCESS,
    provinces,
  }
}

export function getDistrictsAvailable(province) {
  return {
    type: types.GET_DISTRICTS_AVAILABLE,
    province,
  }
}

export function getDistrictsAvailableSuccess(districts) {
  return {
    type: types.GET_DISTRICTS_AVAILABLE_SUCCESS,
    districts,
  }
}

export function changeAddCameraParams(payload) {
  return {
    type: types.CHANGE_CAMERA_PARAMS,
    payload,
  }
}
// get cam location via GoogleMapApi
export function getCameraLocation(payload) {
  return {
    type: types.GET_CAMERA_LOCATION,
    payload,
  }
}

export function gotoSitemapPage() {
  return {
    type: types.GOTO_SITEMAP_PAGE,
  }
}

export function exitSitemapPage() {
  return {
    type: types.EXIT_SITEMAP_PAGE,
  }
}

export function getCameraPositionSuccess(province, district, commune) {
  return {
    type: types.GET_CAMERA_POSITION_SUCCESS,
    province,
    district,
    commune,
  }
}

// export function searchCamFailure(errors) {
//   return {
//     type: types.SEARCH_CAMERA_FAILURE,
//     errors,
//   }
// }

export function focusOnCam({ center, zoom, id }) {
  return {
    type: types.FOCUS_ON_CAM,
    center,
    zoom,
    id,
  }
}
//

export function cancelFocusedCam() {
  return {
    type: types.CANCEL_FOCUSED_CAM,
  }
}

export function configCam({ id, center, zoom, name, ip }) {
  return {
    type: types.CONFIG_CAM,
    name,
    ip,
    center,
    zoom,
    id,
  }
}
export function getCamConnection(id) {
  return {
    type: types.GET_CAM_CONNECTION,
    id,
  }
}

export function getCamConnectionSuccess(connection) {
  return {
    type: types.GET_CAM_CONNECTION_SUCCESS,
    connection,
  }
}

export function getCamConnectionFailure() {
  return {
    type: types.GET_CAM_CONNECTION_FAILURE,
  }
}

export function changeCamConnectionParams(payload) {
  return {
    type: types.CHANGE_CAM_CONNECTION_PARAMS,
    payload,
  }
}
export function changeCamPolitical(payload) {
  return {
    type: types.CHANGE_CAM_POLITICAL,
    payload,
  }
}

export function getCamParams(id) {
  return {
    type: types.GET_CAM_PARAMS,
    id,
  }
}

export function getCamParamsSuccess(params) {
  return {
    type: types.GET_CAM_PARAMS_SUCCESS,
    params,
  }
}

export function getCamParamsFailure() {
  return {
    type: types.GET_CAM_PARAMS_FAILURE,
  }
}

// export function editCamParams(id, payload) {
//   return {
//     type: types.EDIT_CAM_PARAMS,
//     id,
//     payload
//   }
// }

// export function editCamParamsSuccess() {
//   return {
//     type: types.EDIT_CAM_PARAMS_SUCCESS
//   }
// }

// export function editCamParamsFailure() {
//   return {
//     type: types.EDIT_CAM_PARAMS_FAILURE
//   }
// }

//snapshot
// export function getCamSnapshot(id){
//   return {
//     type: types.GET_CAM_SNAPSHOT,
//     id
//   }
// }

// export function getCamSnapshotSuccess(snapshotImageUrl){
//   return {
//     type: types.GET_CAM_SNAPSHOT_SUCCESS,
//     snapshotImageUrl
//   }
// }

// next and back step add camera
export const nextStep = actionCreator(types.NEXT_STEP)
export const backStep = actionCreator(types.BACK_STEP)

//focus first cam
export const focusFirstCam = actionCreator(types.FOCUS_FIRST_CAM, 'payload')

// fetch all cameras
export const fetchAllCams = actionCreator(types.FETCH_ALL_CAMS)
export const fetchAllCamsSuccess = actionCreator(types.FETCH_ALL_CAMS_SUCCESS, 'cams')

//  search camera
export const initSearchCam = actionCreator(types.INIT_SEARCH_CAM)
export const searchCam = actionCreator(types.SEARCH_CAMERA)
export const searchCamSuccess = actionCreator(types.SEARCH_CAMERA_SUCCESS, 'cams')
export const searchCamFailure = actionCreator(types.SEARCH_CAMERA_FAILURE)

// delete camera
export const deleteCam = actionCreator(types.DELETE_CAM, 'id')
export const deleteCamSuccess = actionCreator(types.DELETE_CAM_SUCCESS, 'id')
export const deleteCamFailure = actionCreator(types.DELETE_CAM_FAILURE)

//connect to camera
export const connectToCam = actionCreator(types.CONNECT_TO_CAM, 'payload')
export const connectToCamSuccess = actionCreator(types.CONNECT_TO_CAM_SUCCESS, 'payload')
export const connectToCamFailure = actionCreator(types.CONNECT_TO_CAM_FAILURE, 'payload')
// config params camera
export const configCamParams = actionCreator(types.CONFIG_CAM_PARAMS, 'payload')
export const configCamParamsSuccess = actionCreator(types.CONFIG_CAM_PARAMS_SUCCESS, 'payload')
export const configCamParamsFailure = actionCreator(types.CONFIG_CAM_PARAMS_FAILURE, 'payload')
// config functions for camera
export const configCamFunctions = actionCreator(types.CONFIG_CAM_FUNCTIONS, 'payload')
export const configCamFunctionsSuccess = actionCreator(types.CONFIG_CAM_FUNCTIONS_SUCCESS, 'payload')
export const configCamFunctionsFailure = actionCreator(types.CONFIG_CAM_FUNCTIONS_FAILURE)

// fetch/edit camera's connection
export const fetchCamConnection = actionCreator(types.FETCH_CAM_CONNECTION, 'id')
export const fetchCamConnectionSuccess = actionCreator(types.FETCH_CAM_CONNECTION_SUCCESS, 'payload')
export const fetchCamConnectionFailure = actionCreator(types.FETCH_CAM_CONNECTION_FAILURE)
export const editCamConnection = actionCreator(types.EDIT_CAM_CONNECTION, 'id', 'payload')
export const editCamConnectionSuccess = actionCreator(types.EDIT_CAM_CONNECTION_SUCCESS, 'payload')
export const editCamConnectionFailure = actionCreator(types.EDIT_CAM_CONNECTION_FAILURE, 'payload')

//fetch/edit camera's params
export const fetchCamParams = actionCreator(types.FETCH_CAM_PARAMS, 'id')
export const fetchCamParamsSuccess = actionCreator(types.FETCH_CAM_PARAMS_SUCCESS, 'payload')
export const fetchCamParamsFailure = actionCreator(types.FETCH_CAM_PARAMS_FAILURE)
export const editCamParams = actionCreator(types.EDIT_CAM_PARAMS, 'id', 'payload')
export const editCamParamsSuccess = actionCreator(types.EDIT_CAM_PARAMS_SUCCESS, 'payload')
export const editCamParamsFailure = actionCreator(types.EDIT_CAM_PARAMS_FAILURE, 'payload')

// fetch/edit camera's functions
export const fetchCamFunctions = actionCreator(types.FETCH_CAM_FUNCTIONS, 'id')
export const fetchCamFunctionsSuccess = actionCreator(types.FETCH_CAM_FUNCTIONS_SUCCESS, 'payload')
export const fetchCamFunctionFailure = actionCreator(types.FETCH_CAM_FUNCTIONS_FAILURE)
export const editCamFunctions = actionCreator(types.EDIT_CAM_FUNCTIONS, 'id', 'payload')
export const editCamFunctionsSuccess = actionCreator(types.EDIT_CAM_FUNCTIONS_SUCCESS, 'payload')
export const editCamFunctionFailure = actionCreator(types.EDIT_CAM_FUNCTIONS_FAILURE, 'payload')

// fetch camera snapshot
export const fetchCamSnapShot = actionCreator(types.FETCH_CAM_SNAPSHOT, 'id')

export const changeCamStatus = actionCreator(types.CHANGE_CAM_STATUS, 'id', 'payload')
export const changeCamStatusSuccess = actionCreator(types.CHANGE_CAM_STATUS_SUCCESS, 'payload')
export const changeCamStatusFailure = actionCreator(types.CHANGE_CAM_STATUS_FAILURE, 'payload')

// search camera
export const changeSearchCamParams = actionCreator(types.CHANGE_SEARCH_CAM_PARAMS, 'payload')

// snapshot
export const fetchCamSnapshot = actionCreator(types.FETCH_CAM_SNAPSHOT, 'id')
export const fetchCamSnapshotSuccess = actionCreator(types.FETCH_CAM_SNAPSHOT_SUCCESS, 'payload')

// streaming
export const fetchCamStreamingUrl = actionCreator(types.FETCH_CAM_STREAMING_URL, 'id')
export const fetchCamStreamingUrlSuccess = actionCreator(types.FETCH_CAM_STREAMING_URL_SUCCESS, 'payload')
export const fetchCamStreamingUrlFailure = actionCreator(types.FETCH_CAM_STREAMING_URL_FAILURE)

// fetch cam location via GoogleMapApi
export const fetchCamLocation = actionCreator(types.FETCH_CAM_LOCATION, 'payload')
export const fetchCamLocationSuccess = actionCreator(types.FETCH_CAM_LOCATION_SUCCESS, 'payload')
export const fetcgCamLocationFailure = actionCreator(types.FETCH_CAM_LOCATION_FAILURE)

export const changeCamLocation = actionCreator(types.CHANGE_CAM_LOCATION, 'payload')
export const changeCamLocationSuccess = actionCreator(types.CHANGE_CAM_LOCATION_SUCCESS, 'payload')
export const changeCamLocationFailure = actionCreator(types.CHANGE_CAM_LOCATION_FAILURE, 'payload')

export const fetchStreamingCam = actionCreator(types.FETCH_STREAMING_CAM, 'id')
export const fetchStreamingCamSuccess = actionCreator(types.FETCH_STREAMING_CAM_SUCCESS, 'payload')
export const fetchStreamingCamFailure = actionCreator(types.FETCH_STREAMING_CAM_FAILURE, 'payload')

// fetch camera videos
export const fetchCamRecordVideos = actionCreator(types.FETCH_CAM_RECORD_VIDEOS, 'camId')
export const fetchCamRecordVideosSuccess = actionCreator(types.FETCH_CAM_RECORD_VIDEOS_SUCCESS, 'payload')
export const fetchCamRecordVideosFailure = actionCreator(types.FETCH_CAM_RECORD_VIDEOS_FAILURE, 'payload')

export const updateSelectedRecordVideos = actionCreator(types.UPDATE_SELECTED_RECORD_VIDEOS, 'payload')

export const fetchCamGroup = actionCreator(types.FETCH_CAMERA_GROUP)
export const fetchCamGroupSuccess = actionCreator(types.FETCH_CAMERA_GROUP_SUCCESS, 'payload')
export const fethcCamGroupFailure = actionCreator(types.FETCH_CAMERA_GROUP_FAILURE)

export const clearCamState = actionCreator(types.CLEAR_CAM_STATE)
