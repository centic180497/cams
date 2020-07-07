import * as types from 'constant/constant_actions'

const initialState = {
  trafficLight: {},
  api: {
    isFetchingConfig: false,
    isFetchingConfigViaMode: false,
    isEditingConfig: false,
    isFetchingIntelligentConfigViaType: false,
  },
  error: null,
}

export default function trafficControlReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_CONFIG_TRAFFIC_LIGHT:
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingConfig: true,
        },
      }
    case types.FETCH_CONFIG_TRAFFIC_LIGHT_SUCCESS:
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingConfig: false,
        },
        trafficLight: action.payload,
      }
    case types.FETCH_CONFIG_TRAFFIC_LIGHT_FAILURE:
      return {
        ...state,
        api: {
          ...state.api,
          // isFetchingConfig: false,
        },
      }
    case types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE:
      return {
        ...state,
        trafficLight: {},
        api: {
          ...state.api,
          isFetchingConfigViaMode: true,
        },
      }
    case types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE_SUCCESS:
      return {
        ...state,
        trafficLight: { ...action.payload },
        api: {
          ...state.api,
          isFetchingConfigViaMode: false,
        },
        error: null,
      }
    case types.EDIT_CONFIG_TRAFFIC_LIGHT: {
      return {
        ...state,
        api: {
          ...state.api,
          isEditingConfig: true,
        },
        error: {},
      }
    }
    case types.EDIT_CONFIG_TRAFFIC_LIGHT_SUCCESS: {
      return {
        ...state,
        api: {
          ...state.api,
          isEditingConfig: false,
        },
        error: null,
      }
    }
    case types.EDIT_CONFIG_TRAFFIC_LIGHT_FAILURE: {
      return {
        ...state,
        api: {
          ...state.api,
          isEditingConfig: false,
        },
        error: action.payload,
      }
    }
    case types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE: {
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingIntelligentConfigViaType: true,
        },
        trafficLight: { mode: 'intelligent' },
        error: null
      }
    }
    case types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE_SUCCESS: {
      return {
        ...state,
        api: {
          ...state.api,
          isFetchingIntelligentConfigViaType: false,
        },
        trafficLight: {
          ...state.trafficLight,
          mode: 'intelligent',
          config: action.payload.config,
        },
      }
    }
    default:
      return state
  }
}
