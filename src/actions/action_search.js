import * as types from '../constant/constant_actions'

export function changeSearchCamParams(payload){
  return {
    type: types.CHANGE_SEARCH_CAM_PARAMS,
    payload
  }
}