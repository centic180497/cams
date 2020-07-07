import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchFlowCameras(){
  return axios({
    method: 'get',
    url: `${API_URL}api/flow`
  })
}

export function fetchFlowChartData(payload) {
  const { camId, filter } = payload
  return axios({
    method: 'post',
    url: `${API_URL}api/flow/${camId}`,
    data: {
      ...filter,
      time: filter.time.toString()
    }
  })
}

