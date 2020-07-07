import fullscreen from '../utils/fullscreen'

export const OPERATE = 'OPERATE'
export const FULLSCREEN_CHANGE = 'FULLSCREEN_CHANGE'
export const PLAYER_ACTIVATE = 'PLAYER_ACTIVATE'
export const USER_ACTIVATE = 'USER_ACTIVATE'

export function handleFullscreenChange(isFullscreen){
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen
  }
}


export function play(
  operation = {
    action: 'play',
    source: ''
  }
){
  this.video.play().then().catch(err => console.log(err))
  return {
    type: OPERATE,
    operation
  }
}

export function pause(
  operation = {
    action: 'pause',
    source: ''
  }
){
  this.video.pause().then().catch(err => console.log(err))
  return {
    type: OPERATE,
    operation
  }
}

export function toggleFullscreen(player){
  if(fullscreen.enabled){
    if(fullscreen.isFullscreen){
      fullscreen.exit()
    } else {
      fullscreen.request(this.rootElement)
    }
    return {
      type: OPERATE,
      operation: {
        action: 'toggle-fullscreen'
      }
    }
  }
  console.log('cannot fullscreen')
  return {
    type: FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen
  }
}

