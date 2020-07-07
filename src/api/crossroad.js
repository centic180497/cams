import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import { access_token } from './utils'

export function getCrossroadsRequest() {
  return axios({
    method: 'get',
    url: `${API_URL}api/sitemap/crossroads`,
    headers: {
      Authorization: access_token,
    },
  })
}

export function getCrossroadRequest(id) {
  return axios({
    method: 'get',
    url: `${API_URL}api/sitemap/crossroad/${id}`,
    headers: {
      Authorization: access_token,
    },
  })
}

export function editCrossroadRequest(id, data) {
  return axios({
    method: 'put',
    url: `${API_URL}api/sitemap/crossroad/${id}`,
    headers: {
      Authorization: access_token,
    },
    data: data,
  })
}

export function addCrossroadRequest(crossroad) {
  return axios({
    method: 'post',
    url: `${API_URL}api/sitemap/crossroad`,
    headers: {
      Authorization: access_token,
    },
    data: crossroad,
  })
}

export function deleteCrossroadRequest(id) {
  console.log(id)
  return axios({
    method: 'delete',
    url: `${API_URL}api/sitemap/crossroad/${id}`,
    headers: {
      Authorization: access_token,
    },
  })
}
