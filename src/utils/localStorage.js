export const loadUserData = () => {
  try {
    const serializedUserData = localStorage.getItem('USER')
    if(!serializedUserData) return undefined
    return JSON.parse(serializedUserData)
  } catch (error) {
    return undefined
  }
}

export const loadFollowlistData = () => {
  try {
    const listSize = JSON.getItem("FOLLOW_LIST")
    if(!listSize) return undefined
    return JSON.parse(listSize)
  } catch (error) {
    return undefined
  }
}

