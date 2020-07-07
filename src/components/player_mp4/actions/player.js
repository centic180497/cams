import { getFilename } from 'utils/file'
import fullscreen from '../utils/fullscreen'
import { PlayerTypes } from '../utils/constants'

export function handleFullscreenChange(isFullscreen) {
  return {
    type: PlayerTypes.FULLSCREEN_CHANGE,
    isFullscreen,
  }
}

export function activate(activity) {
  return {
    type: PlayerTypes.PLAYER_ACTIVATE,
    activity,
  }
}

export function userActivate(activity) {
  return {
    type: PlayerTypes.USER_ACTIVATE,
    activity,
  }
}

export function controlBarActive(activity) {
  return {
    type: PlayerTypes.CONTROL_BAR_ACTIVATE,
    activity,
  }
}

export function play(operation = { action: 'play', source: '' }) {
  this.video.play()

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function pause(operation = { action: 'pause', source: '' }) {
  this.video.pause()

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function seek(
  time,
  operation = {
    action: 'seek',
    source: '',
  },
) {
  this.video.seek(time)
  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

// jumps forward x seconds
export function forward(
  seconds,
  operation = {
    action: `forward-${seconds}`,
    source: '',
  },
) {
  this.video.forward(seconds)

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

// jump back x seconds
export function replay(
  seconds,
  operation = {
    action: `replay-${seconds}`,
    source: '',
  },
) {
  this.video.replay(seconds)

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function changeRate(
  rate,
  operation = { action: 'change-rate', source: '' },
) {
  this.video.playbackRate = rate

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function changeVolume(
  volume,
  operation = {
    action: 'change-volume',
    source: '',
  },
) {
  let v = volume
  if (volume < 0) v = 0
  if (volume > 1) v = 1

  this.video.volume = v

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function mute(
  muted,
  operation = {
    action: muted ? 'muted' : 'unmuted',
    source: '',
  },
) {
  this.video.muted = muted

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function snapshot(operation = { action: 'snapshot', source: '' }) {
  const { video } = this.video

  if (video !== undefined) {
    const w = video.videoWidth
    const h = video.videoHeight

    if (w === 0 || h === 0) {
      return { type: PlayerTypes.OPERATE, operation }
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = w
    canvas.height = h
    context.fillRect(0, 0, w, h)
    context.drawImage(video, 0, 0, w, h)

    const link = document.createElement('a')
    link.setAttribute('download', `snapshot_${new Date().getTime()}.png`)
    link.setAttribute(
      'href',
      canvas.toDataURL('image/URL').replace('image/png', 'image/octet-stream'),
    )
    link.click()
  }

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function download(
  player,
  operation = { action: 'download', source: '' },
) {
  const { currentSrc } = player
  const filename = getFilename(currentSrc)
  if (!filename) return {}

  const a = document.createElement('a')

  a.setAttribute('href', currentSrc)
  a.setAttribute('download', filename)
  a.click()

  return {
    type: PlayerTypes.OPERATE,
    operation,
  }
}

export function toggleFullscreen(player) {
  if (fullscreen.enabled) {
    if (fullscreen.isFullscreen) {
      fullscreen.exit()
    } else {
      fullscreen.request(this.rootElement)
    }

    return {
      type: PlayerTypes.OPERATE,
      operation: {
        action: 'toggle-fullscreen',
        source: '',
      },
    }
  }
  return {
    type: PlayerTypes.FULLSCREEN_CHANGE,
    isFullscreen: !player.isFullscreen,
  }
}
