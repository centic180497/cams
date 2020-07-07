import { takeLatest, fork, takeEvery, take, call, put, select } from 'redux-saga/effects'
import * as CameraApi from '../api/camera'
import * as PoliticalAPI from '../api/political'
import * as types from '../constant/constant_actions'
import { reloadPolitical } from '../actions/action_political'
import isEmpty from 'lodash/isEmpty'

export function* watchChangeSearchCamParams(){
  yield takeEvery(types.CHANGE_SEARCH_CAM_PARAMS, function* (action){
    try {
      const { search } = yield select()
      if(!isEmpty(action.payload.province)){
        yield fork(getDistrictsAvailable, action.payload.province.value )
      }else{
        yield put(reloadPolitical({
          districts: [],
          communes: []
        }))
      }
      if(!isEmpty(action.payload.district)){
        yield fork(getCommunesAvailable, action.payload.district.value )
      }else{
        yield put(reloadPolitical({
          communes: []
        }))
      }
      yield fork(searchCamera, search.search_cam)
    } catch (error) {
      
    }
  })
}

function* searchCamera(payload){
  try {
    const response = yield call(CameraApi.searchCamera, payload)
  } catch (error) {
    
  }
}

function* getDistrictsAvailable(province){
  try {
    const response = yield call(PoliticalAPI.getDistrictsAvailable, province)
    yield put(reloadPolitical({
      districts: response.data.data.district_list,
      communes: []
    }))
  } catch (error) {
    
  }
}

function* getCommunesAvailable(district){
  try {
    const response = yield call(PoliticalAPI.getCommunesAvailable, district)
    yield put(reloadPolitical({
      communes: response.data.data.commune_list,
      // communes: []
    }))
  } catch (error) {
    
  }
}