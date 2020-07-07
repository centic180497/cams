import { takeEvery, call, put, all} from 'redux-saga/effects'
import { searchCam } from '../actions/action_camera'
import { reloadPolitical } from '../actions/action_political'

import * as GroupApi from '../api/group'
import * as PoliticalApi from '../api/political'
import * as types from '../constant/constant_actions'

export function* watchGetDataBeforeConnect(){
  yield takeEvery(types.GET_DATA_BEFORE_CONNECT, workerGetDataBeforeConnect)
}

function* workerGetDataBeforeConnect(){
  try {
    const [provinces, groups ] = yield all([
      call(PoliticalApi.getAllProvinces),
      call(GroupApi.getAllGroups),
    ])
    yield put(reloadPolitical({
      provinces:provinces.data.data.province_list, 
      groups: groups.data.data.group_list
    }))
  } catch (error) {
    console.log(error)
  }
}

// export function* watchGetDataBeforeSearch(){
//   yield takeEvery(types.GET_DATA_BEFORE_SEARCH, workerGetDataBeforeSearch)
// }

// function* workerGetDataBeforeSearch(){
//   try {
//     //get all cameras
//     yield put(searchCam())
//     const [provinces, groups] = yield all([
//       call(PoliticalApi.fetchProvincesAvailable),
//       call(GroupApi.getAllGroupsSearch)
//     ])
//     yield put(reloadPolitical({
//       provinces:provinces.data.data.province_list, 
//       districts: [],
//       communes: [],
//       groups: groups.data.data.group_list
//     }))
//   } catch (error) {
//     console.log(error)
//   }
// }