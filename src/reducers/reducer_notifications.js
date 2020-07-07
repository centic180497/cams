import * as types from 'constant/constant_actions'

const initialState = {
  data: [],
  unread: 0,
  isFetching: false,
  isProcessing: false
}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case types.NOTIFICATION__FETCH:
      return {
        ...state,
        isFetching: true,
      }
    case types.NOTIFICATION__FETCH_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        data: action.payload.notify_list,
        unread: action.payload.notseen_count
      }
    case types.NOTIFICATION__PUSH:
      return {
        ...state,
        data: [action.payload, ...state.data],
        unread: state.unread + 1
      }
    case types.NOTIFICATION__READ_MESSAGE_SUCCESS: 
      return {
        ...state,
        unread: action.payload.notseen_count
      }
    default:
      return state
  }
}
