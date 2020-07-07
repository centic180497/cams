import { put, call, } from 'redux-saga/effects'
import * as PoliticalApi from '../api/political'

import {
  reloadPolitical
} from '../actions/action_political'

export function* workerFetchDistricts(action){
  try {
    const res = yield call(PoliticalApi.fetchDistricts, action.payload)
    yield put(reloadPolitical({
      districts: res.data.data.district_list,
      communes: []
    }))
  } catch (error) {
    
  }
}

export function* workerFetchCommunes(action){
  try {
    const res = yield call(PoliticalApi.fetchCommunes, action.payload)
    yield put(reloadPolitical({
      communes: res.data.data.commune_list
    }))
  } catch (error) {
    
  }
}

