import { takeEvery } from 'redux-saga/effects'

import * as types from '../constant/constant_actions'
import { workerFetchCamLocation, workerChangeCamLocation } from './map_saga'

export default function* watchMap() {
  // fetch camera location
  yield takeEvery(types.FETCH_CAM_LOCATION, workerFetchCamLocation)
  // change camera location
  yield takeEvery(types.CHANGE_CAM_LOCATION, workerChangeCamLocation)
}