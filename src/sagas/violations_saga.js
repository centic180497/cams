import { takeEvery, put, call, all, select, fork } from 'redux-saga/effects'
import _ from 'lodash'
import * as ViolationsAPI from 'api/violations'
import { enqueueSnackbar } from '../actions/action_snackbar'
import {
  fetchViolationsSuccess,
  fetchViolationDetailSuccess,
  filterViolationsSuccess,
  deleteViolationsSuccess,
  editViolationDetailSuccess,
  approveViolationsSuccess,
  unApproveViolationsSuccess,
  deleteSingleViolationSuccess,
  exportViolationPDFSuccess,
  exportViolationPDFFailure
} from 'actions/action_violations'
import { closeModal } from 'actions/action_modal'

export function* workerFetchViolations(action) {
  try {
    const res = yield call(ViolationsAPI.fetchViolations, action.payload)
    yield put(fetchViolationsSuccess(res.data.data.result))
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Tải danh sách vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerFetchViolationDetail(action) {
  try {
    const res = yield call(ViolationsAPI.fetchViolationDetail, action.payload.id)
    yield put(fetchViolationDetailSuccess(res.data.data))
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Tải thông tin vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerFilterViolations(action) {
  try {
    const res = yield call(ViolationsAPI.filterViolations, action.payload)
    yield put(filterViolationsSuccess({ ...res.data.data, page: action.payload.page }))
  } catch (error) {
    console.log(error)
  }
}

export function* workerEditViolatioDetail(action) {
  try {
    const { violations } = yield select()
    const { currentViolationId } = violations
    const res = yield call(ViolationsAPI.editViolationDetail, action.payload, currentViolationId)
    yield put(editViolationDetailSuccess({ ...res.data.data }))
    yield put(
      enqueueSnackbar({
        message: 'Sửa thông tin vi phạm thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Sửa thông tin vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerDeleteViolations(action) {
  try {
    const res = yield call(ViolationsAPI.deleteViolations, action.payload)
    yield put(deleteViolationsSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Xóa vi phạm thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Xóa vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerDeleteSingleViolation(action) {
  try {
    const res = yield call(ViolationsAPI.deleteViolations, action.payload)
    yield put(deleteSingleViolationSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Xóa vi phạm thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {}
}

export function* workerApproveViolations(action) {
  try {
    const res = yield call(ViolationsAPI.approveViolations, action.payload)
    yield put(approveViolationsSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Duyệt vi phạm thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Duyệt vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerUnApproveViolations(action) {
  try {
    const res = yield call(ViolationsAPI.unApproveViolations, action.payload)
    yield put(unApproveViolationsSuccess(res.data.data))
    yield put(
      enqueueSnackbar({
        message: 'Bỏ duyệt vi phạm thành công',
        options: {
          variant: 'success',
        },
      }),
    )
  } catch (error) {
    yield put(
      enqueueSnackbar({
        message: 'Bỏ duyệt vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}

export function* workerExportViolationPDF(action) {
  try {
    const data = yield call(ViolationsAPI.exportPDF, action.payload.id, action.payload.values)
    const downloadUrl = window.URL.createObjectURL(
      new Blob([data.data], { type: 'application/pdf' }),
    )
    const link = document.createElement('a')
    link.href = downloadUrl
    link.setAttribute('download', data.headers['x-filename'])
    document.body.appendChild(link)
    link.click()
    link.remove()
    yield put(exportViolationPDFSuccess())
    yield put(closeModal())

  } catch (error) {
    yield put(exportViolationPDFFailure())
    yield put(
      enqueueSnackbar({
        message: 'Xuất biên bản vi phạm thất bại',
        options: {
          variant: 'error',
        },
      }),
    )
  }
}
