import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchLightPeriodChartData(){
  return axios({
    method: 'get',
    url: `${API_URL}api/chart`
  })
}

export function filterChartData(payload){
  return axios({
    method: 'post',
    url: `${API_URL}api/lightPeriod`,
    data: {...payload}
  })
}