import * as types from '../constant/constant_actions'

const INITTIAL_STATE = {
  provinces: [],
  districts: [],
  communes: [],
  groups: [],
}

const reducer_political = (state = INITTIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_ALL_PROVINCES:
      return {
        ...state,
        provinces: action.provinces,
      }

    case types.GET_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.provinces,
      }

    case types.GET_DISTRICTS_SUCCESS:
      return Object.assign({}, state, {})
    case types.GET_COMMUNES_SUCCESS:
      return Object.assign({}, state, {})

    case types.GET_POLITICAL_SUCCESS:
      return {
        ...state,
        districts: action.districts,
        communes: action.communes,
      }

    case types.RELOAD_POLITICAL:
      return {
        ...state,
        ...action.payload,
      }
    case types.SWITCH_TAB:
      return {
        ...state,
        communes: []
      }
    default:
      return state
  }
}

export default reducer_political
