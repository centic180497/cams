import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'
import * as RecordVideoAPI from 'api/record_video'
import { enqueueSnackbar } from '../actions/action_snackbar'
import { filterRecordVideosSuccess, deleteRecordVideosSuccess } from 'actions/action_record_videos'

export function* workerFilterRecordVideos(action) {
  try {
    const res = yield call(RecordVideoAPI.filterRecordVideo, action.payload)
    yield put(filterRecordVideosSuccess({...res.data.data, page: action.payload.page}))
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Tải video thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerDeleteRecordVideos(action){
  try {
    const res =  yield call(RecordVideoAPI.deleteRecordVideos, action.payload)
    yield put(deleteRecordVideosSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Xóa video thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Xóa video thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}