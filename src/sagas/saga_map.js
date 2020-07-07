import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import _ from 'lodash'
import { 
    getCameraLocation,
    getCameraPositionSuccess,
    changeCamPolitical
} from '../actions/action_camera'
import { getPoliticalSuccess, reloadPolitical } from '../actions/action_political'
import { closeModal, showLoadingModal } from '../actions/action_modal'
import * as MapAPI from '../api/map'
import * as types from '../constant/constant_actions'

export function* watchGetCameraLocation(){
  yield takeLatest(types.GET_CAMERA_LOCATION, workerGetCameraLocation)
}

function* workerGetCameraLocation(action){
  try {
    yield put(showLoadingModal('Đang tải dữ liệu'))
    const response = yield MapAPI.reverseGeocoding(action.payload)
    const { data } = response.data
    yield put(getPoliticalSuccess(data.district_list, data.commune_list))
    yield put(getCameraPositionSuccess(
      data.province_similar, 
      data.district_similar, 
      data.commune_similar
    ))
    yield put(closeModal())
  } catch (error) {
    console.log(error)
  }
}

export function* watchChangeCamLocation(){
  yield takeEvery(types.CHANGE_CAM_LOCATION, workerChangeCamLocation)
}

/* show modal -> reverse geo -> change cam politcal -> reload political
  -> close modal
*/
function* workerChangeCamLocation(action){
  try {
    yield put(showLoadingModal('Đang tải dữ liệu'))
    const response = yield MapAPI.reverseGeocoding(action.payload)
    const { data } = response.data
    yield put(changeCamPolitical({
      province: data.province_similar,
      district: data.district_similar,
      commune: data.commune_similar,
    }))
    yield put(reloadPolitical({
      districts: data.district_list,
      communes: data.commune_list,
    })) 
    yield put(closeModal())
  } catch (error) {
    console.log(error)
  }
}

