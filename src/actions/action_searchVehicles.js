import * as types from '../constant/constant_actions'
import  actionCreator from '../utils/actionCreator'

export const clearVehicles = actionCreator(types.CLEAR_VEHCLIES)

export const searchVehicles = actionCreator(types.SEARCH_VEHICLES, 'payload')

export const searchVehiclesSuccess = actionCreator(types.SEARCH_VEHICLES_SUCCESS, 'vehicles')

export const searchVehiclesFailure = actionCreator(types.SEARCH_VEHICLES_FAILURE)

export const hoverRowVehicle = actionCreator(types.HOVER_ROW_VEHICLE , 'vehicle')

export const cancelHoverRowVehicle = actionCreator(types.CANCEL_HOVER_ROW_VEHICLE)

export const focusVehicle = actionCreator(types.FOCUS_VEHICLE, 'vehicle')

export const changeSearchString = actionCreator(types.CHANGE_SEARCH_STRING, 'payload')