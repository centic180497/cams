import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const filterLightPeriodChartData = actionCreator(
  types.FILTER_LIGHT_PERIOD_CHART_DATA,
  'payload',
)

export const filterLightPeriodChartDataSuccess = actionCreator(
  types.FILTER_LIGHT_PERIOD_CHART_DATA_SUCCESS,
  'payload'
)

export const fetchLightPeriodChartData = actionCreator(
  types.FETCH_LIGHT_PERIOD_CHART_DATA,
  'payload',
)

export const fetchLightPeriodChartDataSuccess = actionCreator(
  types.FETCH_LIGHT_PERIOD_CHART_DATA_SUCCESS,
  'payload',
)
export const fetchLightPeriodChartDataFailure = actionCreator(
  types.FETCH_LIGHT_PERIOD_CHART_DATA_FAILURE,
  'payload',
)
