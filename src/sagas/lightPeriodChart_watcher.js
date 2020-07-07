import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from 'constant/constant_actions'
import { workerFetchLightPeriodChartData, workerFilterLightPeriodChartData } from './lightPeriodChart_saga'

export default function* watchLightPeriodChart(){
  yield takeEvery(types.FILTER_LIGHT_PERIOD_CHART_DATA, workerFilterLightPeriodChartData)
}

