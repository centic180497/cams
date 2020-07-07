import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchBlackList(){
  return axios({
    method: 'get',
    url: `${API_URL}api/blackList`,
    
  })
}

export function addVehicle(payload){
  return axios({
    method: 'post',
    url: `${API_URL}api/blackList`,
    data: {
      ...payload
    }
  })
}

export function fetchVehicleData(id){
  return axios({
    method: 'get',
    url: `${API_URL}api/blackList/${id}`
  })
}

export function editVehicleData(id, payload){
  return axios({
    method: 'put',
    url: `${API_URL}api/blackList/${id}`,
    data: {
      ...payload
    }
  })
}

export function deleteVehicle(id){
  return axios({
    method: 'delete',
    url: `${API_URL}api/blackList/${id}`
  })
}

export function fetchVehicleHistory(payload){
  return axios({
    method: 'post',
    url: `${API_URL}api/object/search`,
    data: {
      ...payload
    }
  })
}