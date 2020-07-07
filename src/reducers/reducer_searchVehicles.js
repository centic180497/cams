import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
  vehicles: [],
  search: {
    string: '',
    startTime: null,
    endTime: null,
    filter: null,
  },
  isFetching: false,
  currentPage: 0,
  totalPage: 1,
  matchCams: [],
  hoveredVehicle: {},
  focusedVehicle: {},
  selectedPlate: null,
}


const reducer_searchVehicles = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CLEAR_VEHCLIES:
      return {
        ...state,
        vehicles: [],
        currentPage: 0,
        totalPage: 1,
        hoveredVehicle: {},
        focusedVehicle: {},
        selectedPlate: null,
        matchCams: [],
      }
    case types.CHANGE_SEARCH_STRING: {
      return {
        ...state,
        search: {
          ...state.search,
          string: action.payload
        },
        vehicles: [],
        currentPage: 0,
        totalPage: 1,
        hoveredVehicle: {},
        focusedVehicle: {},
        selectedPlate: null,
        matchCams: [],
        isFetching: true
      }
    }
    case types.SEARCH_VEHICLES:
      return {
        ...state,
        search: {
          ...state.search,
          string: action.payload.string,
          startTime: action.payload.start_time,
          endTime: action.payload.end_time,
          filter: action.payload.filter,
          // matchCams: []
        },
        isFetching: true,
      }

    case types.SEARCH_VEHICLES_SUCCESS:
      return updateResult(state, action)
    case types.SEARCH_VEHICLES_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case types.HOVER_ROW_VEHICLE:
      return {
        ...state,
        hoveredVehicle: action.vehicle,
      }

    case types.CANCEL_HOVER_ROW_VEHICLE:
      return {
        ...state,
        hoveredVehicle: {},
        // clear focused vehicle data
        focusedVehicle: {},
      }

    case types.FOCUS_VEHICLE:
      const camFocused = changeCamFocused(state, action)
      return {
        ...state,
        focusedVehicle: action.vehicle,
        selectedPlate: action.vehicle.plate_number,
        matchCams: camFocused,
      }
    // case types.CHANGE_SEARCH_STRING:
    //   return {
    //     ...state,
    //     search: {
    //       ...state.search,
    //       string: action.payload
    //     }
    //   }
    default:
      return state
  }
}

export default reducer_searchVehicles

function updateResult(state, action) {
  let vehicles = state.vehicles.concat(action.vehicles)
  let totalPage = state.totalPage
  if(action.vehicles.length) {
    totalPage = totalPage + 1
  }
  const matchCams = updateMatchingCams(state.matchCams, action.vehicles)
  
  const selectedPlate = updatePlate(state.selectedPlate, action.vehicles)
  return {
    ...state,
    isFetching: false,
    vehicles,
    currentPage: state.currentPage + 1,
    totalPage,
    matchCams, 
    selectedPlate,
  }
}

function updateMatchingCams(matchCams, vehicles) {
  vehicles.forEach(vehicle => {
    if (vehicle.match === true && !matchCams.includes(vehicle.camera.id)) {
      matchCams.push(vehicle.camera.id)
    }
  })
  return matchCams
}

function updatePlate(selectedPlate, vehicles) {
  vehicles.forEach(vehicle => {
    if (vehicle.match) selectedPlate = vehicle.plate_number
  })
  return selectedPlate
}

function changeCamFocused(state, action) {
  let cams = []
  state.vehicles.forEach(vehicle => {
    if (
      vehicle.plate_number === action.vehicle.plate_number &&
      !cams.includes(vehicle.camera.id)
    ){
      cams.push(vehicle.camera.id)
    }
  })
  
  return cams
}
