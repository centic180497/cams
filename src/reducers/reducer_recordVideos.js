import * as types from 'constant/constant_actions'

const initialState = {
  videos: [],
  filter: {
    startTime: null,
    endTime: null,
    cameras: [],
  },
  selected: [],
  page: 1,
  total: 0,
  totalPage: 0,
  currentVideoId: -1,
  api: {
    isFiltering: false,
    isFetchingRecordVideos: false,
  },
}

export default function recordVideosReducer(state = initialState, action) {
  switch (action.type) {
    case types.FILTER_RECORD_VIDEOS: {
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload.filter,
        },
        api: {
          ...state.api,
          isFiltering: true,
        },
        selected: [],
        totalPage: 0,
      }
    }
    case types.FILTER_RECORD_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: action.payload.result,
        page: action.payload.page,
        total: action.payload.total,
        totalPage: action.payload.total_page,
        api: { ...state.api, isFiltering: false },
      }
    }

    case types.UPDATE_SELECTED_VIDEOS:
      return {
        ...state,
        selected: action.payload,
      }

    case types.DELETE_RECORD_VIDEOS: {
      return {
        ...state,
      }
    }
    case types.DELETE_RECORD_VIDEOS_SUCCESS: {
      return {
        ...state,
        videos: action.payload.result,
        selected: [],
        page: action.payload.page,
        totalPage: action.payload.total_page,
        total: action.payload.total,
      }
    }

    case types.DISPLAY_VIDEO: {
      return {
        ...state,
        currentVideoId: action.payload,
      }
    }
    default:
      return state
  }
}
