import { takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import { workerFilterRecordVideos, workerDeleteRecordVideos } from './record_video_saga'

export default function* watchRecordVideo() {
  // filter record videos
  yield takeEvery(types.FILTER_RECORD_VIDEOS, workerFilterRecordVideos)

  // delete record videos
  yield takeEvery(types.DELETE_RECORD_VIDEOS, workerDeleteRecordVideos)
}
