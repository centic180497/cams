import * as types from '../constant/constant_actions'

export function enqueueSnackbar(notification){
  return {
    type: types.ENQUEUE_SNACKBAR,
    notification: {
      key: new Date().getTime() + Math.random(),
      ...notification
    }
  }
}

export function removeSnackbar(key){
  return {
    type: types.REMOVE_SNACKBAR,
    key
  }
}

