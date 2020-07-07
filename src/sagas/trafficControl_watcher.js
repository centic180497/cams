import { takeEvery, takeLatest, put } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'

import {
  workerFetchConfigTrafficLight,
  workerFetchConfigTrafficLightViaMode,
  workerEditConfigTrafficLight,
  workerFetchIntelligentConfigViaType
} from './trafficControl_saga'

export default function* watchTrafficControl() {
  yield takeEvery(types.FETCH_CONFIG_TRAFFIC_LIGHT, workerFetchConfigTrafficLight)

  yield takeEvery(types.FETCH_CONFIG_TRAFFIC_LIGHT_VIA_MODE, workerFetchConfigTrafficLightViaMode)

  yield takeEvery(types.EDIT_CONFIG_TRAFFIC_LIGHT, workerEditConfigTrafficLight)

  yield takeEvery(types.FETCH_INTELLIGENT_CONFIG_VIA_TYPE, workerFetchIntelligentConfigViaType)
}
