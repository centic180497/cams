import { delay } from 'redux-saga'
import { call, put, race } from 'redux-saga/effects'

import * as UserApi from 'api/authentication'
import { enqueueSnackbar } from 'actions/action_snackbar'
import { loadMeSuccess, loadMeFailure } from 'actions/action_user'
import * as types from '../constant/constant_actions'

const DELAY_TIMEOUT = 5000

export function* workerLogin(action) {
  try {
    const { response, timeout } = yield race({
      response: call(UserApi.login, action.user),
      timeout: delay(DELAY_TIMEOUT),
    })
    if (response) {
      localStorage.setItem('USER', JSON.stringify(response.data))
      yield put({ type: types.LOGIN_SUCCESS, user: response.data })
    } else {
      yield put({ type: types.LOGIN_FAILURE, errors: 'Đăng nhập thất bại' })
      yield put(
        enqueueSnackbar({
          message: 'Đăng nhập thất bại',
          options: {
            variant: 'error',
          },
        }),
      )
    }
  } catch (error) {
    if (Boolean(error.response)) {
      yield put({ type: types.LOGIN_FAILURE, errors: error.response.data.data })
    } else {
      yield put({ type: types.LOGIN_FAILURE })
    }

    yield put(
      enqueueSnackbar({
        message: 'Đăng nhập thất bại',
        options: {
          variant: 'error',
          autoHideDuration: 10000
        },
      }),
    )
  }
}

export function* workerLoadMe() {
  try {
    const response = yield call(UserApi.getProfile)
    yield put(loadMeSuccess(response.data.data))
  } catch (error) {
    yield put(loadMeFailure())
  }
}
