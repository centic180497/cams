const ABORT = 'ABORT'
const CAN_PLAY = 'CAN_PLAY'
const CAN_PLAY_THROUGH = 'CAN_PLAY_THROUGH'
const DURATION_CHANGE = 'DURATION_CHANGE'
const EMPTIED = 'EMPITED'
const ENDED = 'ENDED'
const ERROR = 'ERROR'
const LOADED_DATA = 'LOADED_DATA'
const LOADED_META_DATA = 'LOADED_META_DATA'
const LOAD_START = 'LOAD_START'
const PAUSE = 'PAUSE'
const PLAY = 'PLAY'
const PLAYING = 'PLAYING'
const PROGRESS = 'PROGRESS'
const RATE_CHANGE = 'RATE_CHANGE'
const SEEKED = 'SEEKED'
const SEEKING = 'SEEKING'
const SUSPEND = 'SUSPEND'
const TIME_UPDATE = 'TIME_UPDATE'
const VOLUME_CHANGE = 'VOLUME_CHANGE'
const WAITING = 'WAITING'

export function handleAbort() {
  return {
    type: ABORT,
  }
}

export function handleCanPlay() {
  return {
    type: CAN_PLAY,
  }
}

export function handleCanPlayThrough() {
  return {
    type: CAN_PLAY_THROUGH,
  }
}

export function handleDurationChange() {
  return {
    type: DURATION_CHANGE,
  }
}

export function handleEmptied() {
  return {
    type: EMPTIED,
  }
}

export function handleEnded() {
  return {
    type: ENDED,
  }
}

export function handleError() {
  return {
    type: ERROR,
  }
}

export function handleLoadedData() {
  return {
    type: LOADED_DATA,
  }
}

export function handleLoadedMetaData() {
  return {
    type: LOADED_META_DATA,
  }
}

export function handleLoadStart() {
  return {
    type: LOAD_START,
  }
}

export function handlePause() {
  return {
    type: PAUSE,
  }
}

export function handlePlay() {
  return {
    type: PLAY,
  }
}

export function handlePlaying() {
  return {
    type: PLAYING,
  }
}

export function handleProgress() {
  return {
    type: PROGRESS,
  }
}

export function handleRateChange() {
  return {
    type: RATE_CHANGE,
  }
}

export function handleSeeked() {
  return {
    type: SEEKED,
  }
}

export function handleSeeking() {
  return {
    type: SEEKING,
  }
}

export function handleSuspend() {
  return {
    type: SUSPEND,
  }
}

export function handleTimeUpdate() {
  return {
    type: TIME_UPDATE,
  }
}

export function handleVolumeChange() {
  return {
    type: VOLUME_CHANGE,
  }
}

export function handleWaiting() {
  return {
    type: WAITING,
  }
}
