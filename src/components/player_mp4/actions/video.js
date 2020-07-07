import { VideoTypes } from '../utils/constants'

export function handleAbort(videoProps) {
  return {
    type: VideoTypes.ABORT,
    videoProps,
  }
}

export function handleCanPlay(videoProps) {
  return {
    type: VideoTypes.CAN_PLAY,
    videoProps,
  }
}

export function handleCanPlayThrough(videoProps) {
  return {
    type: VideoTypes.CAN_PLAY_THROUGH,
    videoProps,
  }
}

export function handleDurationChange(videoProps) {
  return {
    type: VideoTypes.DURATION_CHANGE,
    videoProps,
  }
}

export function handleEmptied(videoProps) {
  return {
    type: VideoTypes.EMPTIED,
    videoProps,
  }
}

export function handleEnded(videoProps) {
  return {
    type: VideoTypes.ENDED,
    videoProps,
  }
}

export function handleError(videoProps) {
  return {
    type: VideoTypes.ERROR,
    videoProps,
  }
}

export function handleLoadedData(videoProps) {
  return {
    type: VideoTypes.LOADED_DATA,
    videoProps,
  }
}

export function handleLoadedMetaData(videoProps) {
  return {
    type: VideoTypes.LOADED_META_DATA,
    videoProps,
  }
}

export function handleLoadStart(videoProps) {
  return {
    type: VideoTypes.LOAD_START,
    videoProps,
  }
}

export function handlePause(videoProps) {
  return {
    type: VideoTypes.PAUSE,
    videoProps,
  }
}

export function handlePlay(videoProps) {
  return {
    type: VideoTypes.PLAY,
    videoProps,
  }
}

export function handlePlaying(videoProps) {
  return {
    type: VideoTypes.PLAYING,
    videoProps,
  }
}

export function handleProgress(videoProps) {
  return {
    type: VideoTypes.PROGRESS,
    videoProps,
  }
}

export function handleRateChange(videoProps) {
  return {
    type: VideoTypes.RATE_CHANGE,
    videoProps,
  }
}

export function handleSeeked(videoProps) {
  return {
    type: VideoTypes.SEEKED,
    videoProps,
  }
}

export function handleSeeking(videoProps) {
  return {
    type: VideoTypes.SEEKING,
    videoProps,
  }
}

export function handleStalled(videoProps) {
  return {
    type: VideoTypes.STALLED,
    videoProps,
  }
}

export function handleSuspend(videoProps) {
  return {
    type: VideoTypes.SUSPEND,
    videoProps,
  }
}

export function handleTimeUpdate(videoProps) {
  return {
    type: VideoTypes.TIME_UPDATE,
    videoProps,
  }
}

export function handleVolumeChange(videoProps) {
  return {
    type: VideoTypes.VOLUME_CHANGE,
    videoProps,
  }
}

export function handleWaiting(videoProps) {
  return {
    type: VideoTypes.WAITING,
    videoProps,
  }
}

export function handleSeekingTime(time){
  return {
    type: VideoTypes.SEEKING_TIME,
    time
  }
}

export function handleEndSeeking(time){
  return {
    type: VideoTypes.END_SEEKNG,
    time
  }
}