import { delay } from 'redux-saga'
import { call, put, race, select } from 'redux-saga/effects'

import { enqueueSnackbar } from '../actions/action_snackbar'

import * as VehiclesApi from '../api/searchVehicles'
import {
  searchVehiclesSuccess,
  searchVehiclesFailure,
} from '../actions/action_searchVehicles'

export function* workerSearchVehicles(action) {
  try {
    // const res = yield call(VehiclesApi.searchVehicles, action.payload)
    // yield put(searchVehiclesSuccess(res.data.data.result))
    const { res, timeout } = yield race({
      res: call(VehiclesApi.searchVehicles, action.payload),
      timeout: delay(15000),
    })
    if (res) {
      yield put(searchVehiclesSuccess(res.data.data.result))
    } else {
      yield put(searchVehiclesFailure())
      yield put(
        enqueueSnackbar({
          message: 'Tìm kiếm thất bại',
          options: {
            variant: 'error',
          },
        }),
      )
    }
  } catch (error) {
    console.log(error)
    yield put(searchVehiclesFailure())
    yield put(
      enqueueSnackbar({
        message: 'Tìm kiếm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerChangeSearchString() {
  try {
    const {
      searchVehicles: { search },
    } = yield select()

    const { res, timeout } = yield race({
      res: call(VehiclesApi.searchVehicles, {
        string: search.string,
        page: 1,
        start_time: search.startTime,
        end_time: search.endTime,
        filter: search.filter,
      }),
      timeout: delay(5000),
    })
    if (res) {
      yield put(searchVehiclesSuccess(res.data.data.result))
    } else {
      yield put(searchVehiclesFailure())
      yield put(
        enqueueSnackbar({
          message: 'Tìm kiếm thất bại',
          options: {
            variant: 'error',
          },
        }),
      )
    }
  } catch (error) {}
}
