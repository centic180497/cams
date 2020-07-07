import _ from 'lodash'
import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
  cameras: [],
  addCamera: {
    activeStep: 0,
    name: '',
    port: '',
    ip: '',
    cam_user: '',
    cam_pass: '',
    lat: '',
    lng: '',
    information: {},
    rtsp_link: '',
    snapshot_url: '',
    province: null,
    district: null,
    commune: null,
    group: [],
    encoding: '',
    quality: null,
    quality_range: [],
    resolution: '',
    resolution_range: [],
    fps: '',
    fps_range: {},
    // bitrate: '',
    // bitrate_range: {},
    record: true,
    record_max_keep_days: 30,
    record_file_duration: 20,
    stream: true,
    surveillance: true,
    alpr: true,
    // snapshot_image_url: '',
    // snapshot_image_name: '',
  },
  searchCam: {
    string: '',
    province: null,
    district: [],
    commune: [],
    group: [],
    state_cam: null,
  },
  editCam: {
    connection: {},
    params: {},
    functions: {},
  },
  currentCam: {
    id: '',
    tabValue: 0,
    connection: {},
    params: {},
    functions: {},
  },
  isSearching: false,
  isFetching: false,
  isProcessing: false,
  isGettingSnapshot: false,
  isFetchingSnapshot: false,
  headerMenu: false,
  focusedCam: -1,
  editingCam: -1,
  changingCamStatus: null,
  isShowLiveView: false,
  isFetchingStreaming: false,
  snapshotImageUrl: null,
  streamingCam: {},
  errors: {},
}

function updateCam(cams, action) {
  return cams.map((cam, index) => {
    if (action.camId.includes(cam.id)) {
      return {
        ...cam,
        is_in_followlist: !cam.is_in_followlist,
      }
    }
    return cam
  })
}

function addStreamingCam(streamingCam, action) {
  let newStreamingCam = streamingCam
  action.payload.forEach((cam) => {
    if (cam.cam_id === streamingCam.cam_id) {
      newStreamingCam = {
        ...newStreamingCam,
        is_in_followlist: cam.is_in_followlist,
      }
    }
  })
  return newStreamingCam

  // if (!_.isEmpty(streamingCam)) {
  //   return {
  //     ...streamingCam,
  //     is_in_followlist: !streamingCam.is_in_followlist,
  //   }
  // }
  // return streamingCam
}

function removeStreamingCam(streamingCam, action) {
  let newStreamingCam = streamingCam
  action.camId.forEach((cam) => {
    if (cam === streamingCam.cam_id) {
      newStreamingCam = {
        ...newStreamingCam,
        is_in_followlist: false,
      }
    }
  })
  return newStreamingCam
}

function changeStatusEditingCam(editCam, action) {
  if (!_.isEmpty(editCam.connection)) {
    return {
      ...editCam,
      connection: {
        ...editCam.connection,
        status: action.payload.status,
      },
    }
  }
  return editCam
}

function updateCamStream(state, action) {
  let cameras = state.cameras.map((cam) => {
    return {
      ...cam,
      is_in_followlist: false,
    }
  })
  cameras.forEach((cam, index) => {
    action.payload.forEach((item) => {
      if (item.cam_id === cam.id) {
        cameras[index].is_in_followlist = true
      }
    })
  })
  return {
    ...state,
    cameras: cameras,
  }
}

const reducer_camera = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.ADD_CAM_STREAM_SUCCESS:
      return updateCamStream(state, action)
    case types.REMOVE_CAM_STREAM_SUCCESS:
      return updateCamStream(state, action)
    case types.CHANGE_CAMERA_PARAMS:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          ...action.payload,
        },
      }

    //fetch camera location
    case types.FETCH_CAM_LOCATION:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          ...action.payload,
        },
      }
    case types.FETCH_CAM_LOCATION_SUCCESS:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          province: action.payload.province,
          district: action.payload.district,
          commune: action.payload.commune,
        },
      }

    case types.CHANGE_CAM_LOCATION:
      return {
        ...state,
        editCam: {
          ...state.editCam,
          connection: {
            ...state.editCam.connection,
            ...action.payload,
          },
        },
      }

    case types.CHANGE_CAM_LOCATION_SUCCESS:
      return {
        ...state,
        editCam: {
          ...state.editCam,
          connection: {
            ...state.editCam.connection,
            ...action.payload,
          },
        },
      }

    // fetch camera snapshot
    case types.FETCH_CAM_SNAPSHOT:
      return {
        ...state,
        isFetchingSnapshot: true,
        isFetchingStreaming: true,
        snapshotImageUrl: null,
      }

    case types.FETCH_CAM_SNAPSHOT_SUCCESS:
      return {
        ...state,
        isFetchingSnapshot: false,
        snapshotImageUrl: action.payload,
      }

    // connect to camera
    case types.CONNECT_TO_CAM_SUCCESS:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          activeStep: state.addCamera.activeStep + 1,
          ...action.payload,
        },
        errors: {},
      }

    case types.CONNECT_TO_CAM_FAILURE:
      return {
        ...state,
        errors: action.payload,
      }

    //config params
    case types.CONFIG_CAM_PARAMS_SUCCESS:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          ...action.payload,
          activeStep: state.addCamera.activeStep + 1,
        },
        errors: {},
      }

    case types.CONFIG_CAM_PARAMS_FAILURE:
      return {
        ...state,
        errors: action.payload,
      }

    // config functions
    case types.CONFIG_CAM_FUNCTIONS_SUCCESS:
      return {
        ...state,
        addCamera: INITIAL_STATE.addCamera,
        cameras: [action.payload, ...state.cameras],
      }

    case types.CONFIG_CAM_FUNCTIONS_FAILURE:
      return {
        ...state,
      }

    //change search camera params
    case types.CHANGE_SEARCH_CAM_PARAMS:
      return {
        ...state,
        searchCam: {
          ...state.searchCam,
          ...action.payload,
        },
      }

    //clear province
    case types.CLEAR_PROVINCE:
      return {
        ...state,
        searchCam: {
          ...state.searchCam,
          province: null,
          district: [],
          commune: [],
        },
      }

    //clear district
    case types.CLEAR_DISTRICT:
      return {
        ...state,
        searchCam: {
          ...state.searchCam,
          district: [],
          commune: [],
        },
      }

    //search camera
    case types.SEARCH_CAMERA:
      return {
        ...state,
        isSearching: true,
      }

    case types.SEARCH_CAMERA_SUCCESS:
      return {
        ...state,
        isSearching: false,
        cameras: action.cams,
      }

    case types.SEARCH_CAMERA_FAILURE:
      return {
        ...state,
        isSearching: false,
        cameras: [],
        // errors: action.errors,
      }

    // step add camera
    case types.NEXT_STEP:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          activeStep: state.addCamera.activeStep + 1,
        },
      }

    case types.BACK_STEP:
      return {
        ...state,
        addCamera: {
          ...state.addCamera,
          activeStep: state.addCamera.activeStep - 1,
        },
      }

    //focus on cam
    case types.FOCUS_ON_CAM:
      return {
        ...state,
        focusedCam: action.id,
      }

    case types.FOCUS_FIRST_CAM:
      return {
        ...state,
        focusedCam: action.payload.id,
      }

    case types.CANCEL_FOCUSED_CAM:
      return {
        ...state,
        editCam: INITIAL_STATE.editCam,
        focusedCam: -1,
      }

    // config cam
    case types.CONFIG_CAM:
      return {
        ...state,
        focusedCam: action.id,
        editCam: {
          ...state.editCam,
          connection: {
            ...state.editCam.connection,
            name: action.name,
            ip: action.ip,
            ...action.center,
          },
        },
      }

    // fetch camera connection
    case types.FETCH_CAM_CONNECTION:
      return {
        ...state,
        isFetching: true,
        errors: {},
      }

    case types.FETCH_CAM_CONNECTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentCam: {
          ...state.currentCam,
          connection: action.payload,
        },
        editCam: {
          ...state.editCam,
          connection: action.payload,
        },
      }

    case types.FETCH_CAM_CONNECTION_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    // fetch camera's params
    case types.FETCH_CAM_PARAMS:
      return {
        ...state,
        isFetching: true,
      }

    case types.FETCH_CAM_PARAMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentCam: {
          ...state.currentCam,
          params: action.payload,
        },
        editCam: {
          ...state.editCam,
          params: action.payload,
        },
      }

    case types.FETCH_CAM_PARAMS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    // edit camera's params
    case types.EDIT_CAM_PARAMS:
      return {
        ...state,
        isProcessing: true,
      }

    case types.EDIT_CAM_PARAMS_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        editCam: {
          ...state.editCam,
          params: action.payload,
        },
        currentCam: {
          ...state.currentCam,
          params: action.payload,
        },
        errors: {},
      }
    case types.EDIT_CAM_PARAMS_FAILURE:
      return {
        ...state,
        isProcessing: false,
        errors: action.payload,
      }
    // edit camera's function
    case types.EDIT_CAM_FUNCTIONS:
      return {
        ...state,
        isProcessing: true,
      }

    case types.EDIT_CAM_FUNCTIONS_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        editCam: {
          ...state.editCam,
          functions: action.payload,
        },
        currentCam: {
          ...state.currentCam,
          functions: action.payload,
        },
        errors: {},
      }

    case types.EDIT_CAM_FUNCTIONS_FAILURE:
      return {
        ...state,
        isProcessing: false,
        errors: action.payload,
      }

    //change cam connection params
    case types.CHANGE_CAM_CONNECTION_PARAMS:
      return {
        ...state,
        editCam: {
          ...state.editCam,
          connection: {
            ...state.editCam.connection,
            ...action.payload,
          },
        },
      }

    case types.EDIT_CAM_CONNECTION:
      return {
        ...state,
        isProcessing: true,
      }
    case types.EDIT_CAM_CONNECTION_SUCCESS:
      return {
        ...state,
        isProcessing: false,
        cameras: state.cameras.map((cam) => {
          if (cam.id === action.payload.id) {
            return {
              ...cam,
              lat: action.payload.lat,
              lng: action.payload.lng,
              name: action.payload.name,
            }
          }
          return cam
        }),
        errors: {},
      }

    case types.EDIT_CAM_CONNECTION_FAILURE:
      return {
        ...state,
        isProcessing: false,
        errors: action.payload,
      }

    //fetch functions
    case types.FETCH_CAM_FUNCTIONS:
      return {
        ...state,
        isFetching: true,
        errors: {},
      }

    case types.FETCH_CAM_FUNCTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentCam: {
          ...state.currentCam,
          functions: action.payload,
        },
        editCam: {
          ...state.editCam,
          functions: action.payload,
        },
        errors: {},
      }

    case types.FETCH_CAM_FUNCTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    //streaming
    case types.FETCH_CAM_STREAMING_URL:
      return {
        ...state,
        // isShowLiveView: true,
      }
    case types.FETCH_CAM_STREAMING_URL_SUCCESS:
      return {
        ...state,
        isFetchingStreaming: false,
        streamingCam: action.payload,
      }
    // infowindow
    case types.SHOW_INFO_WINDOW:
      return {
        ...state,
        streamingUrl: {},
        isFetchingStreaming: true,
        isShowLiveView: false,
      }

    case types.CLOSE_INFO_WINDOW:
      return {
        ...state,
        isShowLiveView: false,
        isFetchingStreaming: false,
        streamingUrl: null,
      }

    // update follow list
    case types.ADD_CAM_TO_FOLLOWLIST_SUCCESS:
      return {
        ...state,
        cameras: updateCam(state.cameras, action),
        streamingCam: addStreamingCam(state.streamingCam, action),
      }

    case types.REMOVE_CAM_FROM_FOLLOWLIST_SUCCESS:
      return {
        ...state,
        cameras: updateCam(state.cameras, action),
        streamingCam: removeStreamingCam(state.streamingCam, action),
      }

    case types.FETCH_ALL_CAMS:
      return {
        ...state,
        isFetching: true,
      }
    case types.FETCH_ALL_CAMS_SUCCESS:
      return {
        ...state,
        cameras: action.cams,
        isFetching: false,
      }

    case types.FETCH_ALL_CAMS_FAILURE:
      return {
        ...state,
        cameras: [],
        isFetching: false,
      }

    case types.DELETE_CAM:
      return {
        ...state,
        isProcessing: true,
      }

    case types.DELETE_CAM_SUCCESS:
      return {
        ...state,
        editCam: INITIAL_STATE.editCam,
        currentCam: INITIAL_STATE.currentCam,
        cameras: state.cameras.filter((cam) => cam.id !== action.id),
        focusedCam: -1,
        isProcessing: false,
      }

    case types.DELETE_CAM_FAILURE:
      return {
        ...state,
        isProcessing: false,
      }

    // change camera's status
    case types.CHANGE_CAM_STATUS:
      return {
        ...state,
        changingCamStatus: action.id,
      }
    case types.CHANGE_CAM_STATUS_SUCCESS:
      return {
        ...state,
        changingCamStatus: null,
        cameras: state.cameras.map((cam) => {
          if (cam.id === action.payload.id) {
            return {
              ...cam,
              status: action.payload.status,
            }
          }
          return cam
        }),
        editCam: changeStatusEditingCam(state.editCam, action),
      }
    case types.CHANGE_CAM_STATUS_FAILURE:
      return {
        ...state,
        changingCamStatus: null,
      }
    case types.FETCH_STREAMING_CAM_SUCCESS:
      return {
        ...state,
        streamingCam: action.payload,
        isFetchingStreaming: false,
      }
    case types.SWITCH_TAB:
      return {
        ...state,
        addCamera: INITIAL_STATE.addCamera,
      }
    case types.CLEAR_CAM_STATE:
      return INITIAL_STATE
    default:
      return state
  }
}

export default reducer_camera
