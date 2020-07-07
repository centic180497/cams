import { takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import { workerLogin, workerLoadMe } from './authentication_saga'

export default function* watchUserAuthtication() {
  // login
  yield takeLatest(types.LOGIN, workerLogin)

  yield takeLatest(types.LOAD_ME, workerLoadMe)
  // logout
}
