import { takeEvery } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import {
  workerFetchDistricts,
  workerFetchCommunes,
} from './political_saga'

export default function* watchPolitical() {
  // fetch districts
  yield takeEvery(types.FETCH_DISTRICTS, workerFetchDistricts)
  // fetch communes 
  yield takeEvery(types.FETCH_COMMUNES, workerFetchCommunes)
  
}