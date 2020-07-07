import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'
import { access_token, userId, getToken, getUserId } from './utils'

export function addCamToFollowList(camId) {
  return axios({
    method: 'post',
    url: `${API_URL}api/followList`,
    headers: { Authorization: getToken() },
    data: {
      cam_list: camId,
      user_id: getUserId(),
    },
  })
}

export function removeCamFromFollowList(camId) {
  return axios({
    method: 'delete',
    url: `${API_URL}api/followList`,
    headers: { Authorization: getToken() },
    data: {
      cam_list: camId,
      user_id: getUserId(),
    },
  })
}

export function fetchCamNotFollowed() {
  const userId = getUserId()
  return axios({
    method: 'get',
    url: `${API_URL}api/followList/${userId}/unfollowed`,
    headers: { Authorization: getToken() },
  })
}

export function fetchFollowList(groupId) {
  const userId = getUserId()
  return axios({
    method: 'get',
    url: `${API_URL}api/followList/${userId}/follow`,
    params: { groupId },
    headers: { Authorization: getToken() },
  })
}
