import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const fetchFlowCameras =actionCreator(types.FETCH_FLOW_CAMERAS)
export const fetchFlowCamerasSuccess = actionCreator(types.FETCH_FLOW_CAMERAS_SUCCESS, 'payload')
export const fetchFlowCamerasFailure = actionCreator(types.FETCH_FLOW_CAMERAS_FAILURE, 'payload')

export const fetchFlowChartData = actionCreator(types.FETCH_FLOW_CHART_DATA, 'payload')
export const fetchFlowChartDataSuccess = actionCreator(types.FETCH_FLOW_CHART_DATA_SUCCESS, 'payload')
export const fetchFlowChartDataFailure = actionCreator(types.FETCH_FLOW_CHART_DATA_FAILURE, 'payload')

export const changeVehicleType = actionCreator(types.CHANGE_VEHICLE_TYPE, 'payload')

export const changeChartParams = actionCreator(types.CHANGE_CHART_PARAMS, 'payload')