import axios from 'axios'

const HEADER_AUTH = 'Authorization'
const HEADER_BEARER = 'BEARER'
const HEADER_USER_AGENT = 'User-Agent'

export default class Client4 {
  constructor(){
    this.token = ''
    this.url = ''
    this.urlVersion = '/api'
    this.userId = ''
    this.userRoles = null
  }
  

  doFetch = async (url, options) => {
    const { data } = await this.doFetchWithResponse(url, options)
  }

  doFetchWithResponse = async (url, options) => {
    const response = await axios({ url: url, method: options.method })
    const { data, headers } = response

    return {
      data,
      headers,
    }
  }

  getUrl() {
    return this.url
  }

  setUrl(url) {
    this.url = url
  }

  getUrlVersion() {
    return this.urlVersion
  }

  setUrlVersion(urlVersion) {
    this.urlVersion = urlVersion
  }
  
  getToken() {
    return this.token
  }

  setToken(token) {
    this.token = token
  }

  getUserId() {
    return this.userId
  }

  setUserId(userId) {
    return (this.userId = userId)
  }

  ping = async () => {
    return this.doFetch(`${this.getBaseRoute()}/system/ping?time=${Date.now()}`, { method: 'get' })
  }

  getBaseRoute() {
    return `${this.url}${this.urlVersion}`
  }

  getUsersRoute() {
    return `${this.getBaseRoute()}/users`
  }

  getUserRoute() {
    return `${this.getBaseRoute()}/user`
  }

  getCamerasRoute() {
    return `${this.getBaseRoute()}/cameras`
  }

  getCameraRoute() {
    return `${this.getBaseRoute()}/camera`
  }
}
