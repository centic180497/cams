import axios from 'axios'
import {API_URL} from '../constant/constant_endpoint'
import { access_token } from './utils'

export function searchVehicles(payload){
  return axios({
    method: 'post',
    url: `${API_URL}api/object/search`,
    headers: { 'Authorization': access_token },
    data: {...payload}
  })
}