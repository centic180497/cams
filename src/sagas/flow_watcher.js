import { takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import {
  workerFetchFlowCameras,
  workerFetchFlowChartData,
  // workerChangeChartParams,
} from './flow_saga'

export default function* watchFlow() {
  // fetch flow cameras
  yield takeEvery(types.FETCH_FLOW_CAMERAS, workerFetchFlowCameras)
  // fetch flow chart data
  yield takeEvery(types.FETCH_FLOW_CHART_DATA, workerFetchFlowChartData)

  // yield takeEvery(types.CHANGE_CHART_PARAMS, workerChangeChartParams)
}
