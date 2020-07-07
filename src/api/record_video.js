import axios from 'axios'
import { API_URL } from '../constant/constant_endpoint'

export function filterRecordVideo(payload) {
  let data = {}
  const { filter, page } = payload
  data.start_time = filter.startTime
  data.end_time = filter.endTime
  data.camera = filter.cameras.map(cam => cam.value)
  data.page = page

  return axios({
    method: 'post',
    url: `${API_URL}api/videos`,
    data: { ...data },
  })
}

export function deleteRecordVideos(payload) {
  let data = {}
  const { filter, page, selected } = payload
  data.delete_list = selected
  data.page = page

  data.start_time = filter.startTime
  data.end_time = filter.endTime
  data.camera = filter.cameras.map(cam => cam.value)

  return axios({
    method: 'delete',
    url: `${API_URL}api/videos`,
    data: { ...data },
  })
}
