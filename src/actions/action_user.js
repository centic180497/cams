import * as types from 'constant/constant_actions'

export function loadMe() {
  return {
    type: types.LOAD_ME,
  }
}

export function loadMeSuccess(payload) {
  return {
    type: types.LOAD_ME_SUCCESS,
    payload,
  }
}

export function loadMeFailure(payload) {
  return {
    type: types.LOAD_ME_FAILURE,
    payload
  }
}
