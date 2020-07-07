export function getToken() {
  try {
    const access_token = JSON.parse(localStorage.getItem('USER')).access_token
    return access_token
  } catch (error) {}
}
const access_token = getToken()

export function getUserId() {
  try {
    const userId = JSON.parse(localStorage.getItem("USER")).id
    return userId
  } catch (error) {
    
  }
}

const userId = getUserId()

export {
  access_token, userId
}

