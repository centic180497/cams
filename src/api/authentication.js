import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import { access_token, userId , getToken, getUserId } from './utils'

export function login(user) {
  return axios({
    method: 'post',
    url: `${API_URL}api/user/login`,
    data: user,
  })
}

export function doSignUpRequest({ username, password }) {
  return axios({
    method: 'post',
    url: `${API_URL}api/user/signup`,
    data: {
      username: username,
      password: password,
    },
  })
}

export function getProfile(){
  return axios({
    method: 'get',
    url: `${API_URL}api/user/me`,
    headers: {
      Authorization: getToken()
    }
  })
}

