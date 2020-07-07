import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchViolations(data) {
  return axios({
    method: 'get',
    url: `${API_URL}api/violations`,
    params: data,
  })
}

export function fetchViolationDetail(id) {
  return axios({
    method: 'get',
    url: `${API_URL}api/violations/${id}`,
  })
}

export function filterViolations(payload) {
  let data = {}
  const { filter, page } = payload
  data.plate = filter.q
  data.start_time = filter.startTime
  data.end_time = filter.endTime
  data.camera = filter.cameras.map(cam => cam.value)
  if (filter.status.value === 0) {
    data.status = ''
  } else {
    data.status = filter.status.label
  }

  if (filter.violationType.value === 0) {
    data.vio_type = ''
  } else {
    data.vio_type = filter.violationType.label
  }

  if (filter.vehicleType.value === 0) {
    data.obj_type = ''
  } else {
    data.obj_type = filter.vehicleType.label
  }
  data.page = page
  return axios({
    method: 'post',
    url: `${API_URL}api/violations`,
    data: { ...data },
  })
}

export function editViolationDetail(payload, id) {
  let data = {}
  data.plate = payload.plateNumber
  data.vio_type = payload.violationType.label
  data.obj_type = payload.vehicleType.label
  return axios({
    method: 'put',
    url: `${API_URL}api/violations/${id}/edit`,
    data: { ...data },
  })
}

export function deleteViolations(payload) {
  let data = {}
  const { filter, page, selected } = payload
  // selected violations
  data.delete_list = selected
  // page
  data.page = page

  data.start_time = filter.startTime
  data.end_time = filter.endTime
  data.plate = filter.q
  data.camera = filter.cameras.map(cam => cam.value)
  if (filter.status.value === 0) {
    data.status = ''
  } else {
    data.status = filter.status.label
  }

  if (filter.violationType.value === 0) {
    data.vio_type = ''
  } else {
    data.vio_type = filter.violationType.label
  }

  if (filter.vehicleType.value === 0) {
    data.obj_type = ''
  } else {
    data.obj_type = filter.vehicleType.label
  }

  return axios({
    method: 'delete',
    url: `${API_URL}api/violations`,
    data: { ...data },
  })
}

export function approveViolations(payload){
  return axios({
    method: 'put',
    url: `${API_URL}api/violations/approve`,
    data: {
      approve_list: payload
    }
  })
}

export function unApproveViolations(payload){
  return axios({
    method: 'put',
    url: `${API_URL}api/violations/unapprove`,
    data: {
      unapprove_list: payload
    }
  })
}

export function exportPDF(id, payload){
  return axios({
    method: 'post',
    responseType: 'blob',
    url: `${API_URL}api/violations/${id}/report`,
    data: {
      ...payload
    }
  })
}