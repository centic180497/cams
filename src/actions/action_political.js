import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export function getAllProvinces() {
  return {
    type: types.GET_ALL_PROVINCES
  }
}

export function getProvincesSuccess(provinces){
  return {
    type: types.GET_PROVINCES_SUCCESS,
    provinces
  }
}

export function getPoliticalSuccess(districts, communes){
  return {
    type: types.GET_POLITICAL_SUCCESS,
    districts, 
    communes
  }
}

export function reloadPolitical(payload){
  return {
    type: types.RELOAD_POLITICAL,
    payload: payload
  }
}

export function clearProvince(){
  return {
    type: types.CLEAR_PROVINCE
  }
}

export function clearDistrict(){
  return {
    type: types.CLEAR_DISTRICT
  }
}

export const fetchDistricts = actionCreator(types.FETCH_DISTRICTS, 'payload')
export const fetchCommunes = actionCreator(types.FETCH_COMMUNES, 'payload')