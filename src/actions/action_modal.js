import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export function showAddModal(modalType) {
  return {
    type: types.SHOW_ADD_MODAL,
    modalType,
    // data: data,
  }
}

export function showEditModal({ modalType, id }) {
  return {
    type: types.SHOW_EDIT_MODAL,
    modalType,
    id,
  }
}

export function showLoadingModal(content) {
  return {
    type: types.SHOW_LOADING_MODAL,
    content,
  }
}

export function loadModalDataSuccess() {
  return {
    type: types.LOAD_MODAL_DATA_SUCCESS,
  }
}

export function showDeleteModal({ modalType, id }) {
  return {
    type: types.SHOW_DELETE_MODAL,
    modalType,
    id,
  }
}

export function closeModal(modalType) {
  return {
    type: types.CLOSE_MODAL,
    modalType,
  }
}

export const showDeleteCamModal = actionCreator(
  types.SHOW_DELETE_CAM_MODAL,
  'payload',
)

export const modal_showAddCam = actionCreator(types.MODAL__SHOW_ADD_CAM)

export const showAddToBlackListModal = actionCreator(
  types.MODAL__SHOW_ADD_TO_BLACK_LIST,
)

export const showEditVehicleBlackList = actionCreator(
  types.MODAL__SHOW_EDIT_VEHICLE_FROM_BLACK_LIST
)

export const showDeleteVehicleModal = actionCreator(
  types.SHOW_DELETE_VEHICLE_MODAL,
  'payload'
)

export const showCamInfoModal = actionCreator(
  types.MODAL__SHOW_CAM_INFO,
)

export const showExportPDfModal = actionCreator(
  types.MODAL__SHOW_EXPORT_PDF
)