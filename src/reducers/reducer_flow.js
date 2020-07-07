import moment from 'moment'
import * as types from 'constant/constant_actions'

const initialState = {
  cameras: [],
  detail: [],
  type: ['bike', 'car', 'truck', 'minibus'],
  filter: {
    // startTime: new Date(),
    startTime: moment().subtract(30, 'day')._d,
    endTime: new Date().setSeconds(0),
  },
  chart: {
    // startTime: new Date(2019, 10, 28, 8, 55).setSeconds(0),
    startTime: new Date().setSeconds(0),
    unit: { value: '1m', label: '1 phút' },
  },
  api: {
    isFetchingCameras: false,
    isFetchingChartData: false,
  },
}

export default function flowReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_FLOW_CAMERAS: {
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingCameras: true,
        },
      }
    }
    case types.FETCH_FLOW_CAMERAS_SUCCESS: {
      return {
        ...state,
        cameras: action.payload,
        api: {
          ...state.api,
          isFetchingCameras: false,
        },
      }
    }
    case types.FETCH_FLOW_CAMERAS_FAILURE: {
      return {
        ...state,
      }
    }

    case types.FETCH_FLOW_CHART_DATA: {
      return {
        ...state,
        detail: [],
        api: {
          ...state.api,
          isFetchingChartData: true,
        },
      }
    }
    case types.FETCH_FLOW_CHART_DATA_SUCCESS: {
      return {
        ...state,
        detail: action.payload.flows,
        api: {
          ...state.api,
          isFetchingChartData: false,
        },
      }
    }

    case types.CHANGE_VEHICLE_TYPE: {
      return {
        ...state,
        type: changeVehicleType(state, action),
      }
    }

    case types.CHANGE_CHART_PARAMS: {
      return {
        ...state,
        chart: {
          ...state.chart,
          ...action.payload
        }
      }
    }
    default: {
      return state
    }
  }
}

function changeVehicleType(state, action) {
  let vehicleType = [...state.type] || []
  Object.keys(action.payload).forEach(key => {
    if (action.payload[key]) {
      if (key === 'bike') {
        vehicleType.unshift(key)
      } else if (key === 'minibus') {
        vehicleType.push(key)
      } else if (key === 'car') {
        vehicleType.includes('bike') ? vehicleType.splice(1, 0, 'car') : vehicleType.unshift('car')
      } else if (key === 'truck') {
        vehicleType.includes('minibus')
          ? vehicleType.splice(vehicleType.length - 1, 0, 'truck')
          : vehicleType.push('truck')
      }
    } else {
      const index = vehicleType.indexOf(key)
      if (index !== -1) vehicleType.splice(index, 1)
    }
  })
  return vehicleType
}
