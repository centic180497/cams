import * as types from '../constant/constant_actions'
const LIST_CAM = 0, PARAMS_CONFIGS = 1, FUNCTIONS_CONFIG = 2

const INITIAL_STATE = {
  tabValue: 0,
  rightSiteState: LIST_CAM
}

const reducer_manageCam = (state =INITIAL_STATE, action) => {
  switch(action.type){
    case types.SWITCH_TAB:
      return {
        ...state,
        tabValue: action.value
      }
    case types.CONFIG_CAM:
      return {
        ...state, 
        tabValue: 1
      }
    case types.FOCUS_ON_CAM:
      return {
        ...state, 
        tabValue: 0
      }
    case types.CANCEL_FOCUSED_CAM:
      return {
        ...state,
        tabValue: 0
      }
    case types.DELETE_CAM_SUCCESS:
      return {
        ...state,
        tabValue: 0
      }
    default:
      return state
  }
}

export default reducer_manageCam