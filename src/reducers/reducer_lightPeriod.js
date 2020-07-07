import * as types from 'constant/constant_actions'

const initialState = {
  data: {
    flows: [],
    waitlines: [],
    periods: []
  },
  filter: {
    time: new Date(),
    // via: { value: 'phase', label: 'Tuyến' },
  },
  api: {
    isFetchingChartData: false,
  },
}

export default function lightPeriodReducer(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_LIGHT_PERIOD_CHART_DATA: {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        },
        api: {
          ...state.api,
          isFetchingChartData: true
        }
      }
    }

    case types.FILTER_LIGHT_PERIOD_CHART_DATA_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        },
        api: {
          ...state.api,
          isFetchingChartData: false
        }
      }
    }
    case types.FETCH_LIGHT_PERIOD_CHART_DATA:
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingChartData: true,
        },
      }
    case types.FETCH_LIGHT_PERIOD_CHART_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
        api: {
          ...state.api,
          isFetchingChartData: false,
        },
      }
    default:
      return state
  }
}
