import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import { 
    getAllProvinces,
    getProvincesSuccess,
    reloadPolitical
} from '../actions/action_political'
import { isEmpty } from 'lodash' 
import * as PoliticalAPI from '../api/political'
import { changeAddCameraParams } from '../actions/action_camera';

export function* watchGetAllProvinces(){
  yield takeLatest( types.GET_ALL_PROVINCES, workerGetAllProvinces )
}

function* workerGetAllProvinces(){
  try {
    const response = yield call(PoliticalAPI.getAllProvinces)
    yield put(getProvincesSuccess(response.data.data.province_list))
  } catch (error) {
    console.log(error)
  }
}

export function* watchChangeCameraParams(){
  yield takeLatest( types.CHANGE_CAMERA_PARAMS, workerChangeCameraParams)
}

function* workerChangeCameraParams(action){
  try {
    if(!isEmpty(action.payload.province)){
      const response = yield call(PoliticalAPI.loadDistricts, action.payload.province.value)
      yield put(reloadPolitical({
        districts: response.data.data.district_list,
        communes: []
      }))
      yield put(changeAddCameraParams({
        district: '',
        commune: ''
      }))
    }
    if(!isEmpty(action.payload.district)){
      const response = yield call(PoliticalAPI.loadCommunes, action.payload.district.value)
      yield put(reloadPolitical({
        communes: response.data.data.commune_list
      }))
      yield put(changeAddCameraParams({
        commune: '',
      }))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* watchClearProvince(){
  yield takeEvery(types.CLEAR_PROVINCE, workerClearProvince)
}

function* workerClearProvince(action){
  yield put(reloadPolitical({
    districts: [],
    communes: []
  }))
}

export function* watchClearDistrict(){
  yield takeEvery(types.CLEAR_DISTRICT, workerClearDistrict)
}

function* workerClearDistrict(action){
  yield put(reloadPolitical({
    communes: []
  }))
}