import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
    notifications: []
}

const reducer_snackbar = ( state = INITIAL_STATE, action) => {
  switch (action.type){
    case types.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      }

    case types.REMOVE_SNACKBAR:
      return {
        ...state,
      }
      
    default:
      return state
  }
}

export default reducer_snackbar