import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
  isCurrentPage: false,
  cameras: [],
  camsNotFollowed: [],
  isFetching: false,
  isFetchingCamsNotFollowed: false,
  group: [{ value: 'all', label: 'Tất cả' }],
  listSize: 16,
  currentPage: 1,
  totalPage: 1,
}

// function updateCam(cams, action) {
//   return cams.map((cam, index) => {
//     if (action.camId.includes(cam.id)) {
//       return {
//         ...cam,
//         is_in_followlist: !cam.is_in_followlist,
//       }
//     }
//     return cam
//   })
// }

// TODO: fix remove multi item
function removeCam(state, action) {
  let cameras = state.cameras

  const newCameras = state.cameras.filter(cam => cam.cam_id !== action.camId[0])
  return {
    ...state,
    cameras: newCameras,
    totalPage: Math.ceil(newCameras.length / state.listSize),
  }
}

function addCam(state, action) {
  return {
    ...state,
    cameras: state.cameras.concat(action.payload),
    totalPage: Math.ceil((state.cameras.length + action.payload.length) / state.listSize),
  }
}

function updateFollowList(state, action) {
  // console.log(action)
  let newCameras = state.cameras
  state.cameras.forEach((camera, index) => {
    action.payload.forEach(cam => {
      if (cam.cam_id === camera.cam_id) {
        newCameras[index] = cam
      }
    })
  })
  // console.log(newCameras)
  return {
    ...state,
    cameras: newCameras,
  }
}

function updateStartStream(state, action) {
  const newCameras = state.cameras.map(cam => {
    if (cam.cam_id === action.payload[0].cam_id) {
      return action.payload[0]
    }
    return cam
  })

  return {
    ...state,
    cameras: newCameras,
  }
}

function updateAddStream(state, action) {
  const newCameras = state.cameras.map(cam => {})

  return {
    ...state,
    cameras: action.payload,
    totalPage: Math.ceil(action.payload.length / state.listSize),
  }
}

const reducer_followList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CHANGE_LIST_SIZE:
      return {
        ...state,
        listSize: action.listSize,
        currentPage: 1,
        totalPage: Math.ceil(state.cameras.length / action.listSize),
      }

    case types.CHANGE_FOLLOWLIST_PAGE:
      return {
        ...state,
        currentPage: action.page,
      }

    case types.GET_FOLLOWLIST:
      return {
        ...state,
        isFetching: true,
      }

    case types.GET_FOLLOWLIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        cameras: action.camList,
        totalPage: Math.ceil(action.camList.length / state.listSize),
      }

    case types.START_CAM_STREAM_SUCCESS:
      return updateStartStream(state, action)

    case types.ADD_CAM_STREAM:
      return {
        ...state,
        cameras: state.cameras.concat(action.payload),
        totalPage: Math.ceil((state.cameras.length + action.payload.length) / state.listSize),
      }

    case types.ADD_CAM_STREAM_SUCCESS:
      // return updateAddStream(state, action)
      return {
        ...state,
        cameras: action.payload,
        totalPage: Math.ceil(action.payload.length / state.listSize),
      }

    case types.REMOVE_CAM_STREAM_SUCCESS:
      return {
        ...state,
        cameras: action.payload,
        totalPage: Math.ceil(action.payload.length / state.listSize),
      }

    case types.FETCH_CAMS_NOT_FOLLOWED:
      return {
        ...state,
        isFetchingCamsNotFollowed: true,
      }

    case types.FETCH_CAMS_NOT_FOLLOWED_SUCCESS:
      return {
        ...state,
        isFetchingCamsNotFollowed: false,
        camsNotFollowed: action.payload,
      }

    case types.FETCH_CAMS_NOT_FOLLOWED_FAILURE:
      return {
        ...state,
        isFetchingCamsNotFollowed: false,
        camsNotFollowed: [],
      }

    case types.UPDATE_FOLLOWLIST:
      return updateFollowList(state, action)

    case types.FETCH_FOLLOW_LIST:
      return {
        ...state,
        isFetching: true,
      }

    case types.FETCH_FOLLOW_LIST_SUCCESS:
      return {
        ...state,
        cameras: action.payload,
        currentPage: 1,
        totalPage: Math.ceil(action.payload.length / state.listSize),
        isFetching: false,
      }

    case types.FETCH_FOLLOW_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
      }

    case types.ADD_CAM_TO_FOLLOWLIST_SUCCESS:
      return addCam(state, action)

    case types.REMOVE_CAM_FROM_FOLLOWLIST_SUCCESS:
      return removeCam(state, action)

    case types.FETCH_CAMERA_GROUP_SUCCESS:
      return {
        ...state,
        groups: [{ value: 'all', label: 'Tất cả' }, ...action.payload],
      }
    default:
      return state
  }
}

export default reducer_followList
