import * as types from '../constant/constant_actions'

const INITIAL_STATE = {
  isOpen: false,
  content: null,
  isLoading: false,
  modalType: null,
  data: null,
}

const reducer_modal = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SHOW_ADD_MODAL:
      return { 
        ...state, 
        showModal: true, 
        modalType: action.modalType 
      }

    case types.SHOW_EDIT_MODAL:
      return {
        ...state,
        showModal: true,
        isLoading: true,
        modalType: action.modalType,
      }

    case types.LOAD_MODAL_DATA_SUCCESS:
      return { 
        ...state, 
        isLoading: false 
      }

    case types.SHOW_DELETE_MODAL:
      return {
        ...state,
        showModal: true,
        modalType: action.modalType,
        id: action.id,
      }

    case types.SHOW_GET_LOCATION_MODAL:
      return {
        ...state,
        showModal: true,
      }

    case types.SHOW_LOADING_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: 'LOADING',
        content: action.content,
      }

    case types.SHOW_DELETE_CAM_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: 'DELETE_CAM',
        data: action.payload,
      }
    case types.MODAL__SHOW_ADD_CAM:
      return {
        ...state,
        isOpen: true,
        modalType: 'ADD_CAM'
      }
    case types.MODAL__SHOW_ADD_TO_BLACK_LIST:
      return {
        ...state,
        isOpen: true,
        modalType: 'ADD_TO_BLACK_LIST'
      }
    case types.MODAL__SHOW_EDIT_VEHICLE_FROM_BLACK_LIST:
      return {
        ...state,
        isOpen: true,
        modalType: 'EDIT_VEHICLE_FROM_BLACK_LIST'
      }
    case types.SHOW_DELETE_VEHICLE_MODAL:
      return {
        ...state,
        isOpen: true,
        modalType: 'DELETE_VEHICLE_FROM_BLACK_LIST',
        data: action.payload
      }
    case types.MODAL__SHOW_CAM_INFO:
      return {
        ...state,
        isOpen: true,
        modalType: 'CAM_INFO',
        data: {}
      }
    case types.MODAL__SHOW_EXPORT_PDF: {
      return {
        ...state,
        isOpen: true,
        modalType: 'EXPORT_PDF',
      }
    }
    case types.CLOSE_MODAL:
      return INITIAL_STATE

    default:
      return state
  }
}

export default reducer_modal
