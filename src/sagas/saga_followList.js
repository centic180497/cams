import {
  takeLatest,
  takeEvery,
  fork,
  all,
  call,
  put,
  select,
} from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import * as FollowListApi from '../api/followList'

export function watchAddCamToFollowList(){
  yield takeEvery(types.ADD_CAM_TO_FOLLOWLIST, workerAddCamToFollowList)
}

function* workerAddCamToFollowList(action){
  try {
    const response = yield call(FollowListApi.addCamToFollowList, action.camId)
  } catch (error) {
    
  }
}