import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import access_token from './utils'

export function getSitemapRequest() {
  return axios({
    method: 'get',
    url: `${API_URL}api/sitemap`,
    headers: {
      Authorization: access_token,
    },
  })
}
