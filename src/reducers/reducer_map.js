import * as types from '../constant/constant_actions'
import { defaultCenter } from '../constant/constant_endpoint'

const INITIAL_STATE = {
    current_infowindow: {

    },
    defaultCenter: defaultCenter,
    center: defaultCenter,
    // defaultCenter: {
    //   lat: 16.036308499726402,
    //   lng: 108.20592484212307
    // },
    // center: {
    //   lat: 16.036308499726402,
    //   lng: 108.20592484212307
    // },
    zoom: 13,
    defaultZoom: 13,
    fitBoundsMap: false,
    showInfoWindow: -1,
    focusedCam: -1,
    editingCam: -1,
    isEditingCam: false,
    isAddingCam: false,
}

const reducer_map = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case types.SHOW_INFO_WINDOW:
      return {
        ...state,
        showInfoWindow: action.payload.id,
        center: action.payload.center
      }

    case types.CLOSE_INFO_WINDOW:
      return {
        ...state,
        showInfoWindow: INITIAL_STATE.showInfoWindow
      }

    //change bounds
    case types.CHANGE_BOUNDS_MAP:
      return {
        ...state, 
        center: action.payload.center,
        zoom: action.payload.zoom,
      }

    // focus camera
    case types.FOCUS_ON_CAM:
      return {
        ...state, 
        center: action.center,
        // zoom: action.zoom,
        // focusedCam: action.id
      }
    // case types.CANCEL_FOCUSED_CAM:
    //   return Object.assign({}, state, {
    //     focusedCam: -1
    //   })

    case types.FOCUS_FIRST_CAM:
      return {
        ...state,
        center: action.payload.center,
        zoom: action.payload.zoom
      }

    case types.CONFIG_CAM:
      return {
        ...state, 
        center: action.center,
        zoom: action.zoom,
      }

    case types.SEARCH_CAMERA_SUCCESS:
      return {
        ...state,
        fitBoundsMap: true
      }

    case types.TOGGLE_ADD_CAM_MAP:
      return {
        ...state,
        isAddingCam: !state.isAddingCam
      }

    case types.TOGGLE_EDIT_CAM_MAP:
      return {
        ...state, 
        isEditingCam: !state.isEditingCam
      }

    case types.HOVER_ROW_VEHICLE:
      return {
        ...state,
        center:{
          lat: action.vehicle.camera.lat,
          lng: action.vehicle.camera.lng,
        }
      }
    case types.CLEAR_CAM_STATE:
      return INITIAL_STATE
    default:
      return state
  }
}

export default reducer_map