import { VideoTypes, PlayerTypes } from '../utils/constants'

const initialState = {
  isActive: false,
  userActivity: true,
  showControlBar: true,

  currentSrc: null,
  duration: 0,
  currentTime: 0,
  seekingTime: 0,
  buffered: null,
  waiting: false,
  seeking: false,
  paused: true,
  autoPaused: false,
  ended: false,
  playbackRate: 1,
  muted: false,
  volume: 1,
  readyState: 0,
  networkState: 0,
  videoWidth: 0,
  videoHeight: 0,
  hasStarted: false,
  userActivity: true,
  isActive: false,
  isFullscreen: false,
  activeTextTrack: null,
}

export default function player(state = initialState, action) {
  switch (action.type) {
    case PlayerTypes.USER_ACTIVATE:
      return {
        ...state,
        userActivity: action.activity,
      }
    case PlayerTypes.PLAYER_ACTIVATE:
      return {
        ...state,
        isActive: action.activity,
      }
    case PlayerTypes.CONTROL_BAR_ACTIVATE:
      return {
        ...state,
        showControlBar: action.activity,
      }
    case PlayerTypes.FULLSCREEN_CHANGE:
      return {
        ...state,
        isFullscreen: !!action.isFullscreen,
      }
    case VideoTypes.LOAD_START:
      return {
        ...state,
        ...action.videoProps,
        hasStarted: false,
        ended: false,
      }
    case VideoTypes.CAN_PLAY:
      return {
        ...state,
        ...action.videoProps,
        waiting: false,
      }
    case VideoTypes.WAITING:
      return {
        ...state,
        ...action.videoProps,
        waiting: true,
      }
    case VideoTypes.PAUSE:
      return {
        ...state,
        ...action.videoProps,
        paused: true,
      }
    case VideoTypes.PLAY:
      return {
        ...state,
        ...action.videoProps,
        ended: false,
        paused: false,
        autoPaused: false,
        waiting: false,
        hasStarted: true,
      }
    case VideoTypes.CAN_PLAY_THROUGH:
    case VideoTypes.PLAYING:
      return {
        ...state,
        ...action.videoProps,
        waiting: false,
      }
    case VideoTypes.SEEKING:
      return {
        ...state,
        ...action.videoProps,
        seeking: true,
      }
    case VideoTypes.SEEKED:
      return {
        ...state,
        ...action.videoProps,
        seeking: false,
        seekingTime: 0,
      }
    case VideoTypes.SEEKING_TIME:
      return {
        ...state,
        seekingTime: action.time,
      }
    case VideoTypes.END_SEEKNG:
      return {
        ...state,
      }
    case VideoTypes.ERROR:
      return {
        ...state,
        ...action.videoProps,
        error: 'UNKNOWN ERROR',
        ended: true,
      }
    case VideoTypes.ABORT:
    case VideoTypes.DURATION_CHANGE:
    case VideoTypes.EMPTIED:
    case VideoTypes.LOADED_DATA:
    case VideoTypes.LOADED_META_DATA:
    case VideoTypes.STALLED:
    case VideoTypes.SUSPEND:
    case VideoTypes.PROGRESS:
    case VideoTypes.TIME_UPDATE:
    case VideoTypes.VOLUME_CHANGE:
      return {
        ...state,
        ...action.videoProps,
      }

    default:
      return state
  }
}
