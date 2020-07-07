import * as types from '../constant/constant_actions'

export function createGroup(name){
    return {
        type: types.CREATE_GROUP,
        name
    }
}

export function createGroupSuccess(groups){
    return {
        type: types.CREATE_GROUP_SUCCESS

    }
}

export function createGroupFailure(groups){
    return {
        type: types.CREATE_GROUP_FAILURE
    }
}