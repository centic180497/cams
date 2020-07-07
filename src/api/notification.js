import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function fetchNotification(){
  return axios({
    method: 'get',
    url: `${API_URL}api/notification`
  })
}

export function countUnread(){
  return axios({
    method: 'get',
    url: `${API_URL}api/notification/unread_message_count`
  })
}

export function readMessage(id){
  return axios({
    method: 'put',
    url: `${API_URL}api/notification/${id}/seen`
  })
}