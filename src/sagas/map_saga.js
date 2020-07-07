import { call, put } from 'redux-saga/effects'
import _ from 'lodash'

import * as MapApi from '../api/map'
import { showLoadingModal, closeModal } from '../actions/action_modal'
import { fetchCamLocationSuccess, changeCamLocationSuccess } from '../actions/action_camera'
import { reloadPolitical } from '../actions/action_political'

export function* workerFetchCamLocation(action){
  try {
    yield put(showLoadingModal('Đang tải dữ liệu'))
    const res = yield call(MapApi.reverseGeocoding, action.payload)
    const { data } = res.data
    yield put(fetchCamLocationSuccess({
      province: data.province_similar,
      district: data.district_similar,
      commune: data.commune_similar
    }))
    yield put(reloadPolitical({
      districts: data.district_list,
      communes: data.commune_list
    }))
    yield put(closeModal())
  } catch (error) {
    console.log(error)
  }
}

export function* workerChangeCamLocation(action){
  try {
    yield put(showLoadingModal('Đang tải dữ liệu'))
    const res = yield call(MapApi.reverseGeocoding, action.payload)
    const { data } = res.data
    yield put(changeCamLocationSuccess({
      province: data.province_similar,
      district: data.district_similar,
      commune: data.commune_similar
    }))
    yield put(reloadPolitical({
      districts: data.district_list,
      communes: data.commune_list,
    }))
    yield put(closeModal())
  } catch (error) {
    
  }
}