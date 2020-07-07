import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchConfigTrafficLight(){
  return axios({
    method: 'get',
    url: `${API_URL}api/trafficcontrol`
  })
}

export function fetchConfigTrafficLightViaMode(mode){
  return axios({
    method: 'get',
    url: `${API_URL}api/trafficControl/${mode}`
  })
}

export function editConfigTrafficLight(data){
  return axios({
    method: 'put',
    url: `${API_URL}api/trafficcontrol`,
    data
  })
}

export function fetchIntelligentConfigViaType(type){
  return axios({
    method: 'get',
    url: `${API_URL}api/trafficcontrol/intelligent/${type}`
  })
}