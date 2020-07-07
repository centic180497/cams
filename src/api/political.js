import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import { getToken, getUserId } from './utils'

export function getAllProvinces(){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/provinces`,
    headers: { 'Authorization': getToken() },
  })
}


export function loadDistricts(province){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/districts`,
    headers: { 'Authorization': getToken() },
    params: {
      province: province
    }
  })
}

export function fetchDistricts(province) {
  return axios({
    method: 'get',
    url: `${API_URL}api/political/districts`,
    headers: { 'Authorization': getToken() },
    params: {
      province: province
    }
  })
}
export function loadCommunes(district){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/communes`,
    headers: {
      'Authorization': getToken()
    },
    params: {
      district: district
    }
  })
}

export function fetchCommunes(district){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/communes`,
    headers: { 'Authorization': getToken() },
    params: {
      district: district
    }
  })
}
export function fetchProvincesAvailable(){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/provinces/available`,
    headers: { 'Authorization': getToken() },
    // params: {
    //   type: 'available'
    // }
  })
}

export function getDistrictsAvailable(province){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/districts/available`,
    headers: { 'Authorization': getToken() },
    params: {
      province: province
    }
  })
}

export function fetchDistrictsAvailable(province){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/districts/available`,
    headers: { 'Authorization': getToken() },
    params: {
      province: province
    }
  })
}

export function getCommunesAvailable(district){
  console.log(district)
  return axios({
    method: 'get',
    url: `${API_URL}api/political/communes/available`,
    headers: { 'Authorization': getToken() },
    params: {
      district: district
    }
  })
}

export function fetchCommunesAvailable(district){
  return axios({
    method: 'get',
    url: `${API_URL}api/political/communes/available`,
    headers: { 'Authorization': getToken() },
    params: {
      district: district
    }
  })
}


export function fetchGroupsAvailable(){
  return axios({
    method: 'get',
    url: `${API_URL}api/groups`,
    headers: { 'Authorization': getToken() },
    params: {
      type: 'filter',
    },
  })
}

