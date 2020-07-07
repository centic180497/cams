const MAX_WEBSOCKET_FAILS = 7
const MIN_WEBSOCKET_RETRY_TIME = 3000 // 3 sec
const MAX_WEBSOCKET_RETRY_TIME = 300000 // 5 mins

export default class WebSocketClient {
  constructor() {
    this.conn = null
    this.connectionUrl = null
    this.sequence = 1
    this.eventSequence = 0
    this.connectFailCount = 0
    this.eventCallback = null
    this.responseCallback = {}
    this.firstConnectCallback = null
    this.reconnectCallback = null
    this.missedEventCallback = null
    this.errorCallback = null
    this.closeCallback = null
  }

  initialize(connectionUrl = this.connectionUrl, token) {
    if (this.conn) return

    if (connectionUrl === null) {
      console.log('WebSocket must have connection url')
      return
    }

    if (this.connectFailCount === 0) {
      console.log(`WebSocket connecting to ${connectionUrl}`)
    }

    this.conn = new WebSocket(connectionUrl)
    this.connectionUrl = connectionUrl

    this.conn.onopen = () => {
      console.log('WebSocket opened')
      this.eventSequence = 0

      if (token) {
      }

      if (this.connectFailCount > 0) {
        console.log('Websocket re-established connection')
        if (this.reconnectCallback) {
          this.reconnectCallback()
        }
      } else if (this.firstConnectCallback) {
        this.firstConnectCallback()
      }

      this.connectFailCount = 0
    }

    this.conn.onclose = () => {
      this.conn = null
      this.sequence = 1

      if (this.connectFailCount === 0) {
        console.log('WebSocket closed')
      }

      this.connectFailCount++

      if (this.closeCallback) {
        this.closeCallback(this.connectFailCount)
      }

      let retryTime = MIN_WEBSOCKET_RETRY_TIME

      if (this.connectFailCount > MAX_WEBSOCKET_FAILS) {
        retryTime = MIN_WEBSOCKET_RETRY_TIME * this.connectFailCount
        if (retryTime > MAX_WEBSOCKET_RETRY_TIME) {
          retryTime = MAX_WEBSOCKET_RETRY_TIME
        }
      }

      setTimeout(() => {
        this.initialize(connectionUrl, token)
      }, retryTime)
    }

    this.conn.onerror = evt => {
      if (this.connectFailCount <= 1) {
        console.log('WebSocket error')
        console.log(evt)
      }

      if (this.errorCallback) {
        this.eventCallback(evt)
      }
    }

    this.conn.onmessage = evt => {
      const msg = JSON.parse(evt.data)
      
      if(this.eventCallback){
        this.eventCallback(msg)
      }
    }
  }

  setEventCallback(callback) {
    this.eventCallback = callback
  }

  setFirstConnectCallback(callback) {
    this.firstConnectCallback = callback
  }

  setReconnectCallback(callback) {
    this.reconnectCallback = callback
  }

  setMissedEventCallback(callback) {
    this.missedEventCallback = callback
  }

  setErrorCallback(callback) {
    this.errorCallback = callback
  }

  setCloseCallback(callback) {
    this.closeCallback = callback
  }

  close() {
    this.connectFailCount = 0
    if (this.conn && this.conn.readyState === WebSocket.OPEN) {
      this.conn.onclose = () => {}
      this.conn.close()
      this.conn = null
      console.log('WebSocket closed')
    }
  }

  sendMessage(action, data, responseCallback) {
    const msg = {}

    if (this.conn && this.conn.readyState === WebSocket.OPEN) {
      this.conn.send(JSON.stringify(msg))
    } else if (!this.conn || this.conn.readyState === WebSocket.CLOSED) {
      this.conn = null
      this.initialize()
    }
  }
}
