import { takeEvery, takeLatest } from 'redux-saga/effects'
import * as types from '../constant/constant_actions'
import {
  workerFetchViolations,
  workerFetchViolationDetail,
  workerFilterViolations,
  workerEditViolatioDetail,
  workerDeleteViolations,
  workerApproveViolations, 
  workerUnApproveViolations,
  workerDeleteSingleViolation,
  workerExportViolationPDF
} from './violations_saga'

export default function* watchViolations() {
  // fetch violations
  yield takeEvery(types.FETCH_VIOLATIONS, workerFetchViolations)
  // fetch violation detail
  yield takeEvery(types.FETCH_VIOLATION_DETAIL, workerFetchViolationDetail)
  // filter violations
  yield takeEvery(types.FILTER_VIOLATIONS, workerFilterViolations)
  // edit violation detail
  yield takeEvery(types.EDIT_VIOLATION_DETAIL, workerEditViolatioDetail)
  // approve violations
  yield takeEvery(types.APPROVE_VIOLATIONS, workerApproveViolations)
  // unapprove violations
  yield takeEvery(types.UNAPPROVE_VIOLATIONS, workerUnApproveViolations)
  // delete violations
  yield takeEvery(types.DELETE_VIOLATIONS, workerDeleteViolations)
  // delete single violation
  yield takeEvery(types.DELETE_SINGLE_VIOLATION, workerDeleteSingleViolation)
  // export PDF 
  yield takeEvery(types.EXPORT_VIOLATION_PDF, workerExportViolationPDF)
}
