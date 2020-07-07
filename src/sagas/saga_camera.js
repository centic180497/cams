import {
  takeLatest,
  takeEvery,
  fork,
  all,
  call,
  put,
  select,
} from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import {
  // connectCameraSuccess,
  // connectCameraFailure,
  // configParamsSucess,
  nextStep,
  // configParamsFailure,
  // configFunctionsSuccess,
  changeSearchCamParams,
  searchCam,
  searchCamSuccess,
  searchCamFailure,
  getCamConnectionSuccess,
  getCamConnectionFailure,
  changeCamConnectionParams,
  editCamConnectionSuccess,
  focusedCam,
  editCamConnectionFailure,
  getCamParamsSuccess,
  // getCamSnapshotSuccess,
  fetchAllCamsSuccess
} from '../actions/action_camera'
import * as CameraApi from '../api/camera'
import * as PoliticalAPI from '../api/political'
import * as FollowListApi from '../api/followList'
import { closeModal, showLoadingModal } from '../actions/action_modal'
import { enqueueSnackbar, removeSnackbar } from '../actions/action_snackbar'
import { reloadPolitical } from '../actions/action_political'
import { switchTab } from '../actions/action_manageCam'
import {} from '../actions/action_camera'
import _ from 'lodash'
import { removeCamFromFollowListSuccess, addCamToFollowListSuccess } from '../actions/action_followList';


export function* watchClearProvince() {
  yield takeEvery(types.CLEAR_PROVINCE, workerClearProvince)
}

function* workerClearProvince(action) {
  yield put(searchCam())
  yield put(
    reloadPolitical({
      districts: [],
      communes: [],
    }),
  )
}

export function* watchClearDistrict() {
  yield takeEvery(types.CLEAR_DISTRICT, workerClearDistrict)
}

function* workerClearDistrict(action) {
  yield put(searchCam())
  yield put(
    reloadPolitical({
      communes: [],
    }),
  )
}

export function* watchChangeSearchCamParams() {
  yield takeEvery(types.CHANGE_SEARCH_CAM_PARAMS, workerChangeSearchCamParams)
}

function* workerChangeSearchCamParams(action) {
  try {
    console.log('hahahah')
    if (_.has(action.payload, 'province')) {
      yield fork(getDistrictsAvailable, action.payload.province)
    }
    if (_.has(action.payload, 'district')) {
      yield fork(getCommunesAvailable, action.payload.district)
    }
    yield put(searchCam())
  } catch (error) {}
}

function* getDistrictsAvailable(province) {
  try {
    const response = yield call(
      PoliticalAPI.getDistrictsAvailable,
      province.value,
    )
    yield put(
      reloadPolitical({
        districts: response.data.data.district_list,
        communes: [],
      }),
    )
  } catch (error) {}
}

function* getCommunesAvailable(district) {
  try {
    const district_code = district.map(item => item.value).toString()
    const response = yield call(
      PoliticalAPI.getCommunesAvailable,
      district_code,
    )
    yield put(
      reloadPolitical({
        communes: response.data.data.commune_list,
      }),
    )
  } catch (error) {}
}

export function* watchSearchCam() {
  yield takeEvery(types.SEARCH_CAMERA, workerSearchCam)
}

export function* workerSearchCam(action) {
  try {
    const { cameras } = yield select()
    const response = yield call(CameraApi.searchCamera, cameras.searchCam)
    yield put(searchCamSuccess(response.data.data.camera_list))
  } catch (error) {
    yield put(searchCamFailure(error.response.data.data))
  }
}

export function* watchGetCamConnection() {
  yield takeEvery(types.GET_CAM_CONNECTION, workerGetCamConnection)
}

/* switch tab ->  get data -> */
function* workerGetCamConnection(action) {
  try {
    // const CONFIGS_TAB = 1
    // yield put(switchTab(CONFIGS_TAB))
    // yield put()
    const response = yield call(CameraApi.getCamConnection, action.id)
    const { connect, political } = response.data.data
    yield put(
      reloadPolitical({
        provinces: political.province_list,
        districts: political.district_list,
        communes: political.commune_list,
        groups: political.group_list,
      }),
    )
    yield put(getCamConnectionSuccess(connect))
  } catch (error) {
    yield put(getCamConnectionFailure())
    yield put(
      enqueueSnackbar({
        message: error.response.data.notify,
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* watchChangeCamConnectionParams() {
  yield takeEvery(
    types.CHANGE_CAM_CONNECTION_PARAMS,
    workerChangeCamConnectionParams,
  )
}

function* workerChangeCamConnectionParams(action) {
  try {
    if (!_.isEmpty(action.payload.province)) {
      yield put(
        changeCamConnectionParams({
          district: null,
          commune: null,
        }),
      )
      const response = yield call(
        PoliticalAPI.loadDistricts,
        action.payload.province.value,
      )
      yield put(
        reloadPolitical({
          districts: response.data.data.district_list,
          communes: [],
        }),
      )
    }
    if (!_.isEmpty(action.payload.district)) {
      yield put(
        changeCamConnectionParams({
          commune: null,
        }),
      )
      const response = yield call(
        PoliticalAPI.loadCommunes,
        action.payload.district.value,
      )
      yield put(
        reloadPolitical({
          communes: response.data.data.commune_list,
        }),
      )
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchEditCamConnection() {
  yield takeEvery(types.EDIT_CAM_CONNECTION, workerEditCamConnection)
}

function* workerEditCamConnection(action) {
  try {
    yield put(showLoadingModal('Đang thay đổi cấu hình camera'))
    const response = yield call(
      CameraApi.editCamConnection, action.id, action.payload,
    )
    yield put(closeModal())
    yield put(
      enqueueSnackbar({
        message: response.data.notify,
        options: {
          variant: 'success'
        }
      })
    )
    yield put(editCamConnectionSuccess(action.id, action.payload))
  } catch (error) {
    yield put(closeModal())
    yield put(editCamConnectionFailure(error.response.data.data))
    yield put(
      enqueueSnackbar({
        message: error.response.data.notify,
        options: {
          variant: 'error',
        },
      })
    )
  }
}

export function* watchGetCamParams(){
  yield takeEvery(types.GET_CAM_PARAMS, workerGetCamParams)
}

function* workerGetCamParams(action){
  console.log('get params')
  try {
    const response = yield call(CameraApi.getCamParams, action.id)
    yield put(getCamParamsSuccess(response.data.data))
  } catch (error) {
    
  }
}

export function* watchEditCamParams(){
  yield takeEvery(types.EDIT_CAM_PARAMS, workerEditCamParams)
}

function* workerEditCamParams(action){
  try {
    const response = yield call(CameraApi.editCamParams, action.id, action.payload)
  } catch (error) {
    
  }
}

//get snapshot
// export function* watchGetCamSnapshot(){
//   yield takeEvery(types.GET_CAM_SNAPSHOT, workerGetCamSnapshot)
// }

// function* workerGetCamSnapshot(action){
//   try {
//     const response = yield call(CameraApi.getCamSnapshot, action.id)
//     yield put(getCamSnapshotSuccess(response.data.data.snapshot_image_url))
//   } catch (error) {
//     yield put(enqueueSnackbar({
//       message: error.response.data.notify,
//       options: {
//         variant: 'error',
//       },
//     }))
//   }
// }

//add cam to followlist
export function *watchAddCamToFollowList(){
  yield takeEvery(types.ADD_CAM_TO_FOLLOWLIST, workerAddCamToFollowList)
}

function* workerAddCamToFollowList(action){
  try {
    const response = yield call(FollowListApi.addCamToFollowList, action.camId)
    yield put(addCamToFollowListSuccess(action.camId))
    yield put(enqueueSnackbar({
      message: response.data.notify,
      options: {
        variant: 'success',
      },
    }))
  } catch (error) {
    yield put(enqueueSnackbar({
      message: error.response.data.notify,
      options: {
        variant: 'error',
      },
    }))
  }
}

//remove cam from followlist
export function* watchRemoveCamFromFollowList(){
  yield takeEvery(types.REMOVE_CAM_FROM_FOLLOWLIST, workerRemoveCamFromFollowList)
}

function* workerRemoveCamFromFollowList(action){
  try {
    const response = yield call(FollowListApi.removeCamFromFollowList, action.camId)
    yield put(removeCamFromFollowListSuccess(action.camId))
    yield put(enqueueSnackbar({
      message: response.data.notify,
      options: {
        variant: 'success',
      },
    }))
  } catch (error) {
    yield put(enqueueSnackbar({
      message: error.response.data.notify,
      options: {
        variant: 'error',
      },
    }))
  }
}
