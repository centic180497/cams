import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from 'constant/constant_actions'
import {
  workerConnectToNotification,
  workerFetchNotification,
  workerReadMessage
} from './notification_saga'

export default function* watchNotification() {
  yield takeEvery(types.NOTIFICATION__FETCH, workerFetchNotification)
  // yield takeEvery(types.NOTIFICATION__CONNECT, workerConnectToNotification)
  //read message
  yield takeEvery(types.NOTIFICATION__READ_MESSAGE, workerReadMessage)
}
