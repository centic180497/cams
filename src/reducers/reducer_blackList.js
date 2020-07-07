import * as types from '../constant/constant_actions'

const initialState = {
  data: [],
  isFetching: false,
  isProcessing: false,
  currentVehicle: {
    id: null,
    formData: {},
    api: {
      pending: false,
      editing: false,
      errors: {},
    },
  },
  vehicleHistory: {
    api: {
      pending: false,
    },
    data: [],
    currentPage: 0,
    totalPage: 1,
    focusedVehicle: {},
    matchCams: [],
  },
  errs: {},
}

function updateBlackList(state, action) {
  const newData = state.data.map(item => {
    if (item.id === action.payload.id) {
      return { ...item, ...action.payload }
    }
    return item
  })
  return {
    ...state,
    data: newData,
    currentVehicle: initialState.currentVehicle,
  }
}

function deleteVehicle(state, action) {}

function updateResult(state, action) {
  const matchCams = updateMatchingCams(
    state.vehicleHistory.matchCams,
    action.payload,
  )
  return {
    ...state,
    vehicleHistory: {
      ...state.vehicleHistory,
      data: action.payload,
      api: {
        ...state.vehicleHistory.api,
        pending: false,
      },
      matchCams: matchCams,
    },
  }
}

function updateMatchingCams(matchCams, vehicles) {
  let cams = []
  vehicles.forEach(vehicle => {
    if (!cams.includes(vehicle.camera.id)) {
      cams.push(vehicle.camera.id)
    }
  })
  return cams
}
export default function blackListReducer(state = initialState, action) {
  switch (action.type) {
    case types.BLACK_LIST__FETCH_LIST:
      return {
        ...state,
        isProcessing: true,
      }
    case types.BLACK_LIST__FETCH_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isProcessing: false,
      }
    case types.BLACK_LIST__FETCH_LIST_FAILURE:
      return {
        ...state,
        isProcessing: false,
      }
    case types.BLACK_LIST__ADD_VEHICLE:
      return {
        ...state,
        isProcessing: true,
      }
    case types.BLACK_LIST__ADD_VEHICLE_SUCCESS:
      return {
        ...state,
        data: [action.payload, ...state.data],
        isProcessing: false,
      }
    case types.BLACK_LIST__ADD_VEHICLE_FAILURE:
      return {
        ...state,
        isProcessing: false,
        errs: action.payload,
      }
    case types.BLACK_LIST__GET_CURRENT_VEHICLE_ID:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          id: action.payload,
        },
      }
    case types.BLACK_LIST__FETCH_VEHICLE_DATA:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          api: {
            ...state.currentVehicle.api,
            pending: true,
          },
        },
        errs: {},
      }
    case types.BLACK_LIST__FETCH_VEHICLE_DATA_SUCCESS:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          formData: action.payload,
          api: {
            ...state.currentVehicle.api,
            pending: false,
            errors: {},
          },
        },
      }
    case types.BLACK_LIST__FETCH_VEHICLE_DATA_FAILURE:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          formData: {},
          api: {
            ...state.currentVehicle.api,
            pending: false,
          },
        },
      }
    case types.BLACK_LIST__EDIT_VEHICLE_DATA:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          api: {
            ...state.currentVehicle.api,
            editing: true,
          },
        },
      }
    case types.BLACK_LIST__EDIT_VEHICLE_DATA_SUCCESS:
      return updateBlackList(state, action)
    case types.BLACK_LIST__EDIT_VEHICLE_DATA_FAILURE:
      return {
        ...state,
        currentVehicle: {
          ...state.currentVehicle,
          api: {
            ...state.currentVehicle.api,
            editing: false,
            errors: action.payload,
          },
        },
      }
    case types.BLACK_LIST__DELETE_VEHICLE:
      return {
        ...state,
        isProcessing: true,
      }
    case types.BLACK_LIST__DELETE_VEHICLE_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        data: state.data.filter(item => item.id !== action.id),
      }
    case types.BLACK_LIST__FETCH_VEHICLE_HISTORY:
      return {
        ...state,
        vehicleHistory: {
          ...state.vehicleHistory,
          api: {
            ...state.vehicleHistory.api,
            pending: true,
          },
          focusedVehicle: {},
          matchCams: []
        },
      }
    case types.BLACK_LIST__FETCH_VEHICLE_HISTORY_SUCCESS:
      return updateResult(state, action)
    // return {
    //   ...state,
    //   vehicleHistory: {
    //     ...state.vehicleHistory,
    //     data: action.payload,
    //     api: {
    //       ...state.vehicleHistory.api,
    //       pending: false
    //     }
    //   }
    // }
    case types.BLACK_LIST__FOCUS_VEHICLE_HISTORY:
      return {
        ...state,
        vehicleHistory: {
          ...state.vehicleHistory,
          focusedVehicle: action.payload,
        },
      }
    case types.BLACK_LIST__CANCEL_FOCUS_VEHICLE_HISTORY:
      return {
        ...state,
        vehicleHistory: {
          ...state.vehicleHistory,
          focusedVehicle: {},
        },
      }
    case types.CLOSE_MODAL:
      return {
        ...state,
        errs: {},
      }
    default:
      return state
  }
}
