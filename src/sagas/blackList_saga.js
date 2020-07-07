import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'
import { enqueueSnackbar } from '../actions/action_snackbar'
import {
  fetchBlackListSuccess,
  fetchBlackListFailure,
  addVehicleToBlackListSuccess,
  addVehicleToBlackListFailure,
  fetchVehicleDataSuccess,
  fetchVehicleDataFailure,
  editVehicleDataSuccess,
  editVehicleDataFailure,
  deleteVehicleSuccess,
  deleteVehicleFailure,
  fetchVehicleHistorySuccess,
  fetchVehicleHistoryFailure,
} from '../actions/action_blackList'

import { closeModal } from 'actions/action_modal'
import * as BlackListApi from '../api/blackList'

export function* workerFetchBlackList(action) {
  try {
    const res = yield call(BlackListApi.fetchBlackList)
    yield put(fetchBlackListSuccess(res.data.data))
  } catch (error) {}
}

export function* workerAddVehicle(action) {
  try {
    const res = yield call(BlackListApi.addVehicle, action.payload)
    yield put(addVehicleToBlackListSuccess(res.data.data))
    yield put(closeModal())
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(addVehicleToBlackListFailure(error.response.data.data))
  }
}

export function* workerFetchVehicleData(action) {
  try {
    const res = yield call(BlackListApi.fetchVehicleData, action.id)
    yield put(fetchVehicleDataSuccess(res.data.data))
  } catch (error) {}
}

export function* workerEditVehicleData(action) {
  try {
    const res = yield call(
      BlackListApi.editVehicleData,
      action.id,
      action.payload,
    )

    yield put(editVehicleDataSuccess(res.data.data))
    yield put(closeModal())
    yield put(
      enqueueSnackbar({
        message: res.data.notify,
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(editVehicleDataFailure(error.response.data.data))
    yield enqueueSnackbar({
      message: error.response.data.notify,
      options: {
        variant: 'error',
      },
    })
  }
}

export function* workerDeleteVehicle(action){
  try {
    const { data } = yield call(BlackListApi.deleteVehicle, action.id)
    yield put(deleteVehicleSuccess(action.id))
    yield put(closeModal())
    yield put(enqueueSnackbar({
      message: data.notify,
      options: {
        variant: 'success'
      }
    }))
  } catch (error) {
    yield put(enqueueSnackbar({
      message: error.response.data.notity,
      options: {
        variant: 'error'
      }
    }))
  }
}

export function* workerFetchVehicleHistory(action){
  try {
    const { data }= yield call(BlackListApi.fetchVehicleHistory, action.payload)
    yield put(fetchVehicleHistorySuccess(data.data.result))
  } catch (error) {
    
  }
}