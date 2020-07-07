import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'
import { enqueueSnackbar } from '../actions/action_snackbar'

import {
  fetchConfigTrafficLightSuccess,
  fetchConfigTrafficLightFailure,
  fetchConfigTrafficLightViaModeSuccess,
  editConfigTrafficLightSuccess,
  editConfigTrafficLightFailure,
  fetchIntelligentConfigViaTypeSuccess
} from 'actions/action_trafficControl'

import * as TrafficControlApi from '../api/trafficControl'
export function* workerFetchConfigTrafficLight() {
  try {
    const res = yield call(TrafficControlApi.fetchConfigTrafficLight)
    yield put(fetchConfigTrafficLightSuccess(res.data.data))
  } catch (error) {}
}

export function* workerFetchConfigTrafficLightViaMode(action) {
  try {
    const res = yield call(TrafficControlApi.fetchConfigTrafficLightViaMode, action.payload.mode)
    yield put(
      fetchConfigTrafficLightViaModeSuccess({
        mode: action.payload.mode,
        config: res.data.data.config,
      }),
    )
  } catch (error) {}
}

export function* workerEditConfigTrafficLight(action) {
  try {
    const res = yield call(TrafficControlApi.editConfigTrafficLight, action.payload)
    yield put(editConfigTrafficLightSuccess())
    yield put(
      enqueueSnackbar({
        message: 'Cấu hình đèn tín hiệu thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(editConfigTrafficLightFailure(error.response.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Cấu hình đèn tín hiệu thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerFetchIntelligentConfigViaType(action){
  try {
    const res = yield call(TrafficControlApi.fetchIntelligentConfigViaType, action.payload.type)
    yield put(fetchIntelligentConfigViaTypeSuccess(res.data.data))
  } catch (error){
    
  }
}