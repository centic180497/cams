import { Client4 } from 'client'

const MAX_NETWORK_RETRIES = 7
const MIN_NETWORK_RETRY_TIME = 3000 // 3 sec
const MAX_NETWORK_RETRY_TIME = 300000 // 5 mins

export async function isOnline() {
  try {
    await Client4.ping()
  } catch (error) {
    return false
  }

  return true
}

let retryCount

export async function checkNetworkStatus(callback) {
  const online = await isOnline()
  if (online) {
    retryCount = 0
  }
}


