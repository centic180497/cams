import * as types from '../constant/constant_actions'
// import { toast } from 'react-toastify'

const INITIAL_STATE = {
  authenticated: false,
  user: {},
  errors: {},
  isFetching: false,
  api: {
    isFetchingMe: false,
  },
}

const reducer_user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
      })

    case types.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        user: action.user,
        errors: {},
        isFetching: false,
      })

    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        authenticated: false,
        user: {},
        errors: action.errors,
        isFetching: false,
      })

    case types.LOAD_ME:
      return { ...state, api: { ...state.api, isFetchingMe: true } }

    case types.LOAD_ME_SUCCESS:
      return { ...state, api: { ...state.api, isFetchingMe: false }, authenticated: true, user: action.payload }

    case types.LOAD_ME_FAILURE: 
      return INITIAL_STATE
      
    case types.LOG_OUT:
      return {
        ...state,
        authenticated: false,
        user: {},
      }
    default:
      return state
  }
}

export default reducer_user
