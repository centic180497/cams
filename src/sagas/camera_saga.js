import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'

import { enqueueSnackbar } from '../actions/action_snackbar'
import {
  fetchAllCamsSuccess,
  searchCam,
  searchCamSuccess,
  searchCamFailure,
  deleteCamSuccess,
  connectToCamSuccess,
  connectToCamFailure,
  configCamParamsSuccess,
  configCamParamsFailure,
  configCamFunctionsSuccess,
  configCamFunctionsFailure,
  fetchCamFunctionsSuccess,
  fetchCamFunctionsFailure,
  fetchCamParamsSuccess,
  editCamParamsSuccess,
  fetchCamConnectionSuccess,
  fetchCamConnectionFailure,
  editCamConnectionSuccess,
  editCamConnectionFailure,
  editCamFunctionsSuccess,
  editCamFunctionFailure,
  editCamParamsFailure,
  changeCamStatusSuccess,
  fetchCamSnapshotSuccess,
  fetchStreamingCamSuccess,
  fetchStreamingCamFailure,
  fetchCamRecordVideosSuccess,
  fetchCamRecordVideosFailure,
  fetchCamGroupSuccess,
} from '../actions/action_camera'
import { reloadPolitical } from '../actions/action_political'
import * as GroupApi from '../api/group'
import * as PoliticalApi from '../api/political'
import * as CameraApi from '../api/camera'
import { closeModal, showLoadingModal } from '../actions/action_modal'

// fetch all cameras
export function* workerFetchAllCams() {
  try {
    const res = yield call(CameraApi.fetchAllCams)
    yield put(fetchAllCamsSuccess(res.data.data.camera_list))
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Tải danh sách camera thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

// init search cam
export function* workerInitSearchCam(action) {
  try {
    yield put(searchCam())
    const { cameras } = yield select()
    const search = cameras.searchCam
    const province_code = !_.isEmpty(search.province) ? search.province.value : ''
    const district_code = !_.isEmpty(search.district)
      ? search.district.map(item => item.value).toString()
      : ''
    const [provinces, districts, communes, groups] = yield all([
      call(PoliticalApi.fetchProvincesAvailable),
      call(PoliticalApi.fetchDistrictsAvailable, province_code),
      call(PoliticalApi.fetchCommunesAvailable, district_code),
      call(PoliticalApi.fetchGroupsAvailable),
    ])
    yield put(
      reloadPolitical({
        provinces: provinces.data.data.province_list,
        districts: districts.data.data.district_list,
        communes: communes.data.data.commune_list,
        groups: groups.data.data.group_list,
      }),
    )
  } catch (error) {
    console.log(error)
    yield put(
      enqueueSnackbar({
        message: 'Tải thông tin tìm kiếm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

// search cam
export function* workerSearchCam(action) {
  try {
    const { cameras } = yield select()
    const res = yield call(CameraApi.searchCamera, cameras.searchCam)
    yield put(searchCamSuccess(res.data.data.camera_list))
  } catch (error) {
    yield put(searchCamFailure())
    yield put(
      enqueueSnackbar({
        message: 'Lọc camera thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

// change search cam params
export function* workerChangeSearchCamParams(action) {
  try {
    if (_.has(action.payload, 'province')) {
      yield fork(fetchDistrictsAvailable, action.payload.province)
    }
    if (_.has(action.payload, 'district')) {
      yield fork(fetchCommunesAvailable, action.payload.district)
    }
    yield put(searchCam())
  } catch (error) {}
}

function* fetchDistrictsAvailable(province) {
  try {
    const res = yield call(PoliticalApi.fetchDistrictsAvailable, province.value)
    yield put(
      reloadPolitical({
        districts: res.data.data.district_list,
        communes: [],
      }),
    )
  } catch (error) {}
}

function* fetchCommunesAvailable(district) {
  try {
    const district_code = district.map(item => item.value).toString()
    const res = yield call(PoliticalApi.fetchCommunesAvailable, district_code)
    yield put(
      reloadPolitical({
        communes: res.data.data.commune_list,
      }),
    )
  } catch (error) {}
}

export function* workerClearProvince() {
  yield put(searchCam())
  yield put(
    reloadPolitical({
      districts: [],
      communes: [],
    }),
  )
}

export function* workerClearDistrict() {
  yield put(searchCam())
  yield put(
    reloadPolitical({
      communes: [],
    }),
  )
}

export function* workerDeleteCam(action) {
  try {
    const res = yield call(CameraApi.deleteCam, action.id)
    yield put(closeModal())
    yield put(deleteCamSuccess(action.id))
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

// connect to camera
export function* workerConnectToCam(action) {
  try {
    yield put(showLoadingModal('Đang kết nối tới camera'))
    const res = yield call(CameraApi.connectToCam, action.payload)
    yield put(connectToCamSuccess(res.data.data))
    yield put(closeModal())
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: error.response.data.notify,
        options: {
          variant: 'error',
        },
      }),
    )
    yield put(closeModal())
    yield put(connectToCamFailure(error.response.data.data))
  }
}

// config cam params
export function* workerConfigCamParams(action) {
  try {
    yield put(showLoadingModal('Đang cấu hình camera'))
    const res = yield call(CameraApi.configCamParams, action.payload)
    yield put(configCamParamsSuccess(action.payload))
    yield put(closeModal())
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: error.response.data.notify,
        options: {
          variant: 'error',
        },
      }),
    )
    yield put(closeModal())
    yield put(configCamParamsFailure(error.response.data.data))
  }
}

// config camera functions
export function* workerConfigCamFunctions(action) {
  try {
    yield put(showLoadingModal('Đang thêm mới camera'))
    const res = yield call(CameraApi.configCamFunctions, action.payload)
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
    yield put(configCamFunctionsSuccess(res.data.data))
    yield put(closeModal())
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: error.response.data.notify,
        options: {
          variant: 'error',
        },
      }),
    )
    yield put(closeModal())
  }
}
// fetch camera connection
export function* workerFetchCamConnection(action) {
  try {
    const res = yield call(CameraApi.fetchCamConnection, action.id)
    const { connect, political } = res.data.data
    yield put(
      reloadPolitical({
        provinces: political.province_list,
        districts: political.district_list,
        communes: political.commune_list,
        groups: political.group_list,
      }),
    )
    yield put(fetchCamConnectionSuccess(connect))
  } catch (error) {
    yield put(fetchCamConnectionFailure())
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

// edit camera connection
export function* workerEditCamConnection(action) {
  try {
    const res = yield call(CameraApi.editCamConnection, action.id, action.payload)
    yield put(
      editCamConnectionSuccess({
        ...action.payload,
        id: action.id,
      }),
    )
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    const errorRes = error.response.data
    if (!_.isEmpty(errorRes.data)) {
      yield put(editCamConnectionFailure(errorRes.data))
    }
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
// fetch camera's params
export function* workerFetchCamParams(action) {
  try {
    const res = yield call(CameraApi.fetchCamParams, action.id)
    yield put(fetchCamParamsSuccess(res.data.data))
  } catch (error) {}
}

// edit camera's functions
export function* workerEditCamParams(action) {
  try {
    const res = yield call(CameraApi.editCamParams, action.id, action.payload)
    yield put(editCamParamsSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(editCamParamsFailure(error.response.data.data))
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

export function* workerFetchCamFunctions(action) {
  try {
    const res = yield call(CameraApi.fetchCamFunctions, action.id)
    yield put(fetchCamFunctionsSuccess(res.data.data))
  } catch (error) {}
}

export function* workerEditCamFunctions(action) {
  try {
    const res = yield call(CameraApi.editCamFunctions, action.id, action.payload)
    yield put(editCamFunctionsSuccess(action.payload))
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(editCamFunctionFailure(error.response.data.data))
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

export function* workerChangeCamStatus(action) {
  try {
    const res = yield call(CameraApi.changeCamStatus, action.id, action.payload)
    yield put(
      changeCamStatusSuccess({
        id: action.id,
        ...res.data.data,
      }),
    )
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    console.log(error)
  }
}

export function* workerFetchCamSnapshot(action) {
  try {
    const res = yield call(CameraApi.fetchCamSnapshot, action.id)
    yield put(fetchCamSnapshotSuccess(res.data.data.snapshot_image_url))
  } catch (error) {}
}

export function* workerFetchStreamingCam(action) {
  try {
    const res = yield call(CameraApi.fetchStreamingCam, action.id)
    yield put(fetchStreamingCamSuccess(res.data.data))
  } catch (error) {}
}

export function* workerFetchCamRecordVideos(action) {
  try {
    const res = yield call(CameraApi.fetchCamRecordVideos)
    yield put(fetchCamRecordVideosSuccess(res.data.data))
  } catch (error) {}
}


export function* workerFetchCamGroup(action){
  try {
    const response = yield call(CameraApi.fetchCamGroup)
    yield put(fetchCamGroupSuccess(response.data.data))
  } catch (error) {
    console.log(error)
  }
}