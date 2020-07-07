import { eventChannel, END, delay } from 'redux-saga'
import {
  takeEvery,
  apply,
  put,
  call,
  fork,
  take,
  cancel,
  cancelled,
  select
} from 'redux-saga/effects'
import * as LightPeriodChartAPI from 'api/lightPeriodChart'
import { fetchLightPeriodChartDataSuccess, filterLightPeriodChartDataSuccess } from 'actions/action_lightPeriodChart'

export function* workerFetchLightPeriodChartData(action){
  try {
    const res = yield call(LightPeriodChartAPI.fetchLightPeriodChartData)
    yield put(fetchLightPeriodChartDataSuccess(res.data.data))
  } catch (error) {
    
  }
}

export function* workerFilterLightPeriodChartData(action){
  try {
    const res = yield call(LightPeriodChartAPI.filterChartData, action.payload )
    yield put(filterLightPeriodChartDataSuccess(res.data.data))
  } catch (error) {
    
  }
}