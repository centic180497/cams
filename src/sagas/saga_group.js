import { takeLatest, takeEvery, call, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import { 
    createGroup,
    createGroupSuccess
} from '../actions/action_group'

import * as GroupApi from '../api/group'

export function* watchCreateGroup(){
    console.log('hihi')
    yield takeLatest(types.CREATE_GROUP, workerCreateGroup)
}

function* workerCreateGroup(action){
    try {
        const response = yield call(GroupApi.createGroup, action.name)

    } catch (error) {
        console.log(error)
    }
}