import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import {
  workerStartFollowList, 
  workerFetchCamNotFollowed, 
  workerAddCamToFollowList,
  workerRemoveCamFromFollowList,
  workerFetchFollowList
} from './followList_saga'

export default function* watchFollowList(){
  
  yield takeEvery(types.FETCH_FOLLOW_LIST, workerFetchFollowList)

  yield takeEvery(types.START_FOLLOWLIST, workerStartFollowList)
  // fetch cam not followed
  yield takeEvery(types.FETCH_CAMS_NOT_FOLLOWED, workerFetchCamNotFollowed)
  // add camera to follow list
  yield takeEvery(types.ADD_CAM_TO_FOLLOWLIST, workerAddCamToFollowList)
  // remove camera from follow list
  yield takeEvery(types.REMOVE_CAM_FROM_FOLLOWLIST, workerRemoveCamFromFollowList)
}