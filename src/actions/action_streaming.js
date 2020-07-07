import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export function getStreamingUrl(id){
  return {
    type: types.GET_STREAMING_URL,
    id
  }
}

export function getStreamingUrlSuccess(streamingUrl){
  return {
    type: types.GET_STREAMING_URL_SUCCESS,
    streamingUrl
  }
}

export function closePrevStreaming(id){
  return {
    type: types.CLOSE_PREV_STREAMING,
    id
  }
}
