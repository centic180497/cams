import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import  {
  workerFetchBlackList,
  workerAddVehicle,
  workerFetchVehicleData,
  workerEditVehicleData,
  workerDeleteVehicle,
  workerFetchVehicleHistory
} from './blackList_saga'
export default function* watchBlackList(){
  // fetch black list
  yield takeEvery(types.BLACK_LIST__FETCH_LIST, workerFetchBlackList)
  // add vehicle to fblack list
  yield takeEvery(types.BLACK_LIST__ADD_VEHICLE, workerAddVehicle)
  // fetch vehicle data
  yield takeEvery(types.BLACK_LIST__FETCH_VEHICLE_DATA, workerFetchVehicleData)
  // edit vehicle data
  yield takeEvery(types.BLACK_LIST__EDIT_VEHICLE_DATA, workerEditVehicleData)
  // delete vehicle data
  yield takeEvery(types.BLACK_LIST__DELETE_VEHICLE, workerDeleteVehicle)
  // fetch vehicle history
  yield takeEvery(types.BLACK_LIST__FETCH_VEHICLE_HISTORY, workerFetchVehicleHistory)
}

