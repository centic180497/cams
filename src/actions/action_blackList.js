import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const fetchBlackList = actionCreator(types.BLACK_LIST__FETCH_LIST)

export const fetchBlackListSuccess = actionCreator(
  types.BLACK_LIST__FETCH_LIST_SUCCESS,
  'payload',
)

export const fetchBlackListFailure = actionCreator(
  types.BLACK_LIST__FETCH_LIST_FAILURE,
)

export const addVehicleToBlackList = actionCreator(
  types.BLACK_LIST__ADD_VEHICLE,
  'payload',
)

export const addVehicleToBlackListSuccess = actionCreator(
  types.BLACK_LIST__ADD_VEHICLE_SUCCESS,
  'payload',
)

export const addVehicleToBlackListFailure = actionCreator(
  types.BLACK_LIST__ADD_VEHICLE_FAILURE,
  'payload',
)

export const getCurrentVehicleId = actionCreator(
  types.BLACK_LIST__GET_CURRENT_VEHICLE_ID,
  'payload',
)

export const fetchVehicleData = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_DATA,
  'id',
)

export const fetchVehicleDataSuccess = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_DATA_SUCCESS,
  'payload',
)

export const fetchVehicleDataFailure = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_DATA_FAILURE,
  'payload',
)

export const editVehicleData = actionCreator(
  types.BLACK_LIST__EDIT_VEHICLE_DATA,
  'id',
  'payload',
)

export const editVehicleDataSuccess = actionCreator(
  types.BLACK_LIST__EDIT_VEHICLE_DATA_SUCCESS,
  'payload',
)

export const editVehicleDataFailure = actionCreator(
  types.BLACK_LIST__EDIT_VEHICLE_DATA_FAILURE,
  'payload',
)

export const deleteVehicle = actionCreator(
  types.BLACK_LIST__DELETE_VEHICLE,
  'id',
)

export const deleteVehicleSuccess = actionCreator(
  types.BLACK_LIST__DELETE_VEHICLE_SUCCESS,
  'id',
)

export const deleteVehicleFailure = actionCreator(
  types.BLACK_LIST__DELETE_VEHICLE_FAILURE,
)

export const fetchVehicleHistory = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_HISTORY,
  'payload',
)

export const fetchVehicleHistorySuccess = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_HISTORY_SUCCESS,
  'payload',
)

export const fetchVehicleHistoryFailure = actionCreator(
  types.BLACK_LIST__FETCH_VEHICLE_HISTORY_FAILURE,
)

export const focusVehicleHistory = actionCreator(
  types.BLACK_LIST__FOCUS_VEHICLE_HISTORY,
  'payload',
)

export const cancelFocusVehicleHistory = actionCreator(
  types.BLACK_LIST__CANCEL_FOCUS_VEHICLE_HISTORY,
)

