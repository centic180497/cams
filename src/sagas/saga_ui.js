import { takeEvery, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import { dismissNotification } from '../actions/action_ui'

const delay = ms => new Promise(res => setTimeout(res, ms))

export function* watchDismissNotification() {
  yield takeEvery(types.SHOW_NOTIFICATION, workerDismissNotification)
}

function* workerDismissNotification() {
  try {
    yield delay(3000)
    yield put(dismissNotification())
  } catch (err) {
    console.log(err)
  }
}
