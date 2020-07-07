import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

// export function showInfoWindow({id, center}) {
//   return {
//     type: types.SHOW_INFO_WINDOW,
//     id,
//     center,
//   }
// }

// show info window
export const showInfoWindow = actionCreator(types.SHOW_INFO_WINDOW, 'payload')

// close info window
export const closeInfoWindow = actionCreator(types.CLOSE_INFO_WINDOW, 'id')

// change map bounds
export const changeBoundsMap = actionCreator(types.CHANGE_BOUNDS_MAP, 'payload')

// toggle AddCamMap
export const toggleAddCamMap = actionCreator(types.TOGGLE_ADD_CAM_MAP)

// toogle Edit Cam Map
export const toggleEditCamMap = actionCreator(types.TOGGLE_EDIT_CAM_MAP)