import * as types from 'constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const fetchConfigTrafficLight = actionCreator(types.FETCH_CONFIG_TRAFFIC_LIGHT)
export const fetchConfigTrafficLightSuccess = actionCreator(
  types.FETCH_CONFIG_TRAFFIC_LIGHT_SUCCESS,
  'payload',
)
export const fetchConfigTrafficLightFailure = actionCreator(
  types.FETCH_CONFIG_TRAFFIC_LIGHT_FAILURE,
)

export const editConfigTrafficLight = actionCreator(types.EDIT_CONFIG_TRAFFIC_LIGHT, 'payload')
export const editConfigTrafficLightSuccess = actionCreator(types.EDIT_CONFIG_TRAFFIC_LIGHT_SUCCESS)
export const editConfigTrafficLightFailure = actionCreator(
  types.EDIT_CONFIG_TRAFFIC_LIGHT_FAILURE,
  'payload',
)

export const fetchConfigTrafficLightViaMode = actionCreator(
  types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE,
  'payload',
)
export const fetchConfigTrafficLightViaModeSuccess = actionCreator(
  types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE_SUCCESS,
  'payload',
)

export const fetchConfigTrafficLightViaModeFailure = actionCreator(
  types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE_FAILURE,
)

export const fetchIntelligentConfigViaType = actionCreator(
  types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE,
  'payload',
)

export const fetchIntelligentConfigViaTypeSuccess = actionCreator(
  types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE_SUCCESS,
  'payload',
)

export const fetchIntelligentViaTypeFailure = actionCreator(
  types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE_FAILRE,
  'payload',
)

export const switchTrafficLightMode = actionCreator(types.SWITH_TRAFFIC_LIGHT_MODE, 'payload')
