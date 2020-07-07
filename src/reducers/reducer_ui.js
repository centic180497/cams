import * as types from '../constant/constant_actions'
const INITIAL_STATE = {
  notification: {
    show: false,
    message: '',
    typeNotification: '',
  },
  cameraFilterSidebar: true,
  violationsFilter: false,
  settingsMenu: false,
  drawer: false,
}
const reducer_ui = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SHOW_NOTIFICATION:
      return {
        ...state,
        notification: {
          show: true,
          message: action.message,
          typeNotification: action.typeNotification,
        },
      }

    case types.DISMISS_NOTIFICATION:
      return {
        ...state,
        notification: {
          show: false,
          message: '',
          typeNotificaion: '',
        },
      }

    case types.TOGGLE_CAMERA_FILTER:
      return {
        ...state,
        cameraFilterSidebar: !state.cameraFilterSidebar,
      }

    case types.TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        settingsMenu: !state.settingsMenu,
      }

    case types.TOGGLE_DRAWER:
      return {
        ...state,
        drawer: !state.drawer,
      }
    case types.TOGGLE_VIOLATIONS_FILTER:
      return {
        ...state,
        violationsFilter: !state.violationsFilter
      }
    default:
      return state
  }
}

export default reducer_ui
