import { takeEvery, call, put } from "redux-saga/effects";
import { getCrossroadRequest } from "../api/crossroad";
import { loadModalDataSuccess } from "../actions/action_modal";
// import {
//   getCrossroadSuccess,
//   clearCrossroadErrors
// } from "../actions/action_crossroad";
import { clearCameraErrors } from "../actions/action_camera";
import * as types from "../constant/constant_actions";

// export function* watchShowEditModal() {
//   yield takeEvery(types.SHOW_EDIT_MODAL, workerGetModalData);
// }

// function* workerGetModalData(action) {
//   try {
//     console.log(action.modalType);
//     switch (action.modalType) {
//       case "EDIT_CROSSROAD":
//         let response = yield call(getCrossroadRequest, action.id);
//         yield put(getCrossroadSuccess(response.data.data));
//         yield put(loadModalDataSuccess());
//         break;
//       case "DELETE_CROSSROAD":
//         // let response_delete = yield call(getCrossroadRequest, action.id)
//         yield call(getCrossroadRequest, action.id);
//         yield put(getCrossroadSuccess(response.data.data));
//         yield put(loadModalDataSuccess());
//         break;
//       case "EDIT_CAMERA":
//         // let camera = yield call(getCameraRequest, action.id)
//         break;
//       case "ADD_CAMERA":
//         break;
//       default:
//         return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* watchShowDeleteModal() {
//   yield takeEvery(types.SHOW_DELETE_MODAL, workerGetDeleteModalData);
// }

// function* workerGetDeleteModalData(action) {
//   try {
//     switch (action.modalType) {
//       case "DELETE_CROSSROAD":
//         let response = yield call(getCrossroadRequest, action.id);
//         yield put(getCrossroadSuccess(response.data.data));
//         yield put(loadModalDataSuccess());
//       default:
//         return null;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* watchCloseModal() {
//   yield takeEvery(types.CLOSE_MODAL, workerCloseModal);
// }

// function* workerCloseModal(action) {
//   try {
//     switch (action.modalType) {
//       case "EDIT_CROSSROAD":
//         yield put(clearCrossroadErrors());
//         break;
//       case "ADD_CROSSROAD":
//         yield put(clearCrossroadErrors());
//         break;
//       case "ADD_CAMERA":
//         yield put(clearCameraErrors());
//         break;
//       default:
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
