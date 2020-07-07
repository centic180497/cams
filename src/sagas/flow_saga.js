import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'
import * as FlowAPI from 'api/flow'
import moment from 'moment'
import { enqueueSnackbar } from '../actions/action_snackbar'
import {
  fetchFlowCamerasSuccess,
  fetchFlowChartData,
  fetchFlowChartDataSuccess,
} from 'actions/action_flow'

export function* workerFetchFlowCameras(action) {
  try {
    const res = yield call(FlowAPI.fetchFlowCameras)
    yield put(fetchFlowCamerasSuccess(res.data.data))
  } catch (error) {}
}

export function* workerFetchFlowChartData(action) {
  try {
    const { flow } = yield select()
    const startTime = flow.chart.startTime
    const unit = flow.chart.unit.value

    const diffTime = new Date() - startTime
    let after = 0,
      before = 40
    if (unit === '1m') {
      after = Math.floor(diffTime / (60 * 1000))
    } else if (unit === '5m') {
      after = Math.floor(diffTime / (5 * 60 * 1000))
    } else if (unit === '10m') {
      after = Math.floor(diffTime / (10 * 60 * 1000))
    } else if (unit === '15m') {
      after = Math.floor(diffTime / (15 * 60 * 1000))
    } else if (unit === '30m') {
      after = Math.floor(diffTime / (30 * 60 * 1000))
    } else if (unit === '1h') {
      after = Math.floor(diffTime / (60 * 60 * 1000))
    } else if (unit === '1d') {
      after = Math.floor(diffTime / (24 * 60 * 60 * 1000))
    }

    if (after > 15) {
      after = 15
    } else if (after < 0) {
      after = 0
    }
    before = 30 - after
    const payload = {
      camId: action.payload.camId,
      filter: {
        time: new Date(flow.chart.startTime),
        unit,
        // before: flow.chart.before,
        before,
        after,
      },
    }
    const res = yield call(FlowAPI.fetchFlowChartData, payload)
    yield put(fetchFlowChartDataSuccess(res.data.data))
  } catch (error) {}
}
