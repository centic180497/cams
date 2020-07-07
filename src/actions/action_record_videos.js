import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const filterRecordVideos = actionCreator(types.FILTER_RECORD_VIDEOS, 'payload')
export const filterRecordVideosSuccess = actionCreator(
  types.FILTER_RECORD_VIDEOS_SUCCESS,
  'payload',
)
export const filterRecordVideosFailure = actionCreator(
  types.FILTER_RECORD_VIDEOS_FAILURE,
  'payload',
)

export const updateSelectedVideos = actionCreator(types.UPDATE_SELECTED_VIDEOS, 'payload')

export const deleteRecordVideos = actionCreator(types.DELETE_RECORD_VIDEOS, 'payload')
export const deleteRecordVideosSuccess = actionCreator(
  types.DELETE_RECORD_VIDEOS_SUCCESS,
  'payload',
)

export const displayVideo = actionCreator(types.DISPLAY_VIDEO, 'payload')