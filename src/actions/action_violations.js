import * as types from '../constant/constant_actions'
import actionCreator from '../utils/actionCreator'

export const fetchViolations = actionCreator(types.FETCH_VIOLATIONS, 'payload')
export const fetchViolationsSuccess = actionCreator(types.FETCH_VIOLATIONS_SUCCESS, 'payload')
export const fetchViolationsFailure = actionCreator(types.FETCH_VIOLATIONS_FAILURE)

export const fetchViolationDetail = actionCreator(types.FETCH_VIOLATION_DETAIL, 'payload')
export const fetchViolationDetailSuccess = actionCreator(
  types.FETCH_VIOLATION_DETAIL_SUCCESS,
  'payload',
)
export const fetchViolationDetailFailure = actionCreator(
  types.FETCH_VIOLATION_DETAIL_FAILURE,
  'payload',
)

export const updateSelectedViolations = actionCreator(types.UPDATE_SELECTED_VIOLATIONS, 'payload')

export const changeViolationParam = actionCreator(types.CHANGE_VIOLATION_PARAM, 'payload')

export const editViolationDetail = actionCreator(types.EDIT_VIOLATION_DETAIL, 'payload')
export const editViolationDetailSuccess = actionCreator(
  types.EDIT_VIOLATION_DETAIL_SUCCESS,
  'payload',
)
export const editViolationDetailFailure = actionCreator(
  types.EDIT_VIOLATION_DETAIL_FAILURE,
  'payload',
)

export const changeParamViolationFilter = actionCreator(
  types.CHANGE_PARAM_VIOLATION_FILTER,
  'payload',
)

export const filterViolations = actionCreator(types.FILTER_VIOLATIONS, 'payload')
export const filterViolationsSuccess = actionCreator(types.FILTER_VIOLATIONS_SUCCESS, 'payload')
export const filterViolationsFailure = actionCreator(types.FILTER_VIOLATIONS_FAILURE, 'payload')

export const deleteViolations = actionCreator(types.DELETE_VIOLATIONS, 'payload')
export const deleteViolationsSuccess = actionCreator(types.DELETE_VIOLATIONS_SUCCESS, 'payload')
export const deleteViolationsFailure = actionCreator(types.DELETE_VIOLATIONS_FAILURE, 'payload')

export const deleteSingleViolation = actionCreator(types.DELETE_SINGLE_VIOLATION, 'payload')
export const deleteSingleViolationSuccess = actionCreator(
  types.DELETE_SINGLE_VIOLATION_SUCCESS,
  'payload',
)
export const deleteSingleViolationFailure = actionCreator(
  types.DELETE_SINGLE_VIOLATION_FAILURE,
  'payload',
)

export const approveViolations = actionCreator(types.APPROVE_VIOLATIONS, 'payload')
export const approveViolationsSuccess = actionCreator(types.APPROVE_VIOLATIONS_SUCCESS, 'payload')
export const approveViolationsFailure = actionCreator(types.APPROVE_VIOLATIONS_FAILURE, 'payload')

export const unApproveViolations = actionCreator(types.UNAPPROVE_VIOLATIONS, 'payload')
export const unApproveViolationsSuccess = actionCreator(
  types.UNAPPROVE_VIOLATIONS_SUCCESS,
  'payload',
)
export const unApproveViolationsFailure = actionCreator(
  types.UNAPPROVE_VIOLATIONS_FAILURE,
  'payload',
)

export const exportViolationPDF = actionCreator(types.EXPORT_VIOLATION_PDF, 'payload')
export const exportViolationPDFSuccess = actionCreator(
  types.EXPORT_VIOLATION_PDF_SUCCESS,
  'payload',
)

export const exportViolationPDFFailure = actionCreator(
  types.EXPORT_VIOLATION_PDF_FAILURE
)