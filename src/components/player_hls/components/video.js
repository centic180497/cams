import React from 'react'
import Hls from 'hls.js'
import { isVideoChild, mediaProperties } from '../utils'

export default class Video extends React.Component {
  constructor(props) {
    super(props)

    this.video = null

    props.manager.subscribeToPlayerFullscreenChange(
      this.handleStateChange.bind(this),
    )

    this.hls = new Hls({
      liveBackBufferLength: 0,
    })
  }

  componentDidMount() {
    this.video.muted = true
    this.forceUpdate()

    this.handleHlsFullscreen(false)

    if (Hls.isSupported()) {
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            this.hls.startLoad()
            break
          case Hls.ErrorTypes.MEDIA_ERROR:
            this.hls.recoverMediaError()
            break
          default:
            this.hls.destroy()
            break
        }
      })
    }
  }

  componentWillUnmount() {
    this.destroyHls()
  }

  destroyHls = () => {
    if (this.hls) {
      this.hls.destroy()
    }
  }

  handleHlsFullscreen = (isFullscreen) => {
    if (Hls.isSupported()) {
      const video = this.video
      this.hls.detachMedia()  
      this.hls.attachMedia(this.video)
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        this.hls.loadSource(
          isFullscreen
            ? `http://116.110.6.137:1085${this.props.cam.stream_main}`
            : `http://116.110.6.137:1085${this.props.cam.stream_url}`,
        )
      })

      this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const promise = video.play()
        if (promise === undefined) {
          promise.then((_) => {}).catch((error) => console.log(error))
        }
        if (promise !== undefined) {
          promise.catch(() => {}).then(() => {})
        }
      })
    }
  }

  handleStateChange = (isFullscreen) => {
    this.handleHlsFullscreen(isFullscreen)
  }

  getProperties = () => {
    if (!this.video) return null

    return mediaProperties.reduce((properties, key) => {
      properties[key] = this.video[key]
      return properties
    }, {})
  }

  get playbackRate() {
    return this.video.playbackRate
  }

  set playbackRate(rate) {
    this.video.playbackRate = rate
  }

  get muted() {
    return this.video.muted
  }

  set muted(val) {
    this.video.muted = val
  }

  get volume() {
    return this.video.volume
  }

  set volume(val) {
    if (val > 1) {
      val = 1
    }
    if (val < 0) {
      val = 0
    }
    this.video.volume = val
  }

  get videoWidth() {
    return this.video.videoWidth
  }

  get videoHeight() {
    return this.video.videoHeight
  }

  play = () => {
    const promise = this.video.play()
    if (promise !== undefined) promise.catch(() => {}).then(() => {})
  }

  pause = () => {
    const promise = this.video.pause()
    if (promise !== undefined) promise.catch(() => {}).then(() => {})
  }

  // Change the video source and re-load the video
  load = () => {
    this.video.load()
  }

  seek = (time) => {
    try {
      this.video.currentTime = time
    } catch (e) {
      console.log(e)
    }
  }

  forward = (seconds) => {
    this.seek(this.video.currentTime + seconds)
  }

  replay = (seconds) => {
    this.forward(-seconds)
  }

  handleAbort = (...args) => {
    const { actions, onAbort } = this.props
    actions.handleAbort(this.getProperties())

    if (onAbort) onAbort(...args)
  }

  handleCanPlay = (...args) => {
    const { actions, onCanPlay } = this.props
    actions.handleCanPlay(this.getProperties())

    if (onCanPlay) onCanPlay(...args)
  }

  handleCanPlayThrough = (...args) => {
    const { actions, onCanPlayThrough } = this.props
    actions.handleCanPlayThrough(this.getProperties())

    if (onCanPlayThrough) onCanPlayThrough(...args)
  }

  handleDurationChange = (...args) => {
    const { actions, onDurationChange } = this.props
    actions.handleDurationChange(this.getProperties())

    if (onDurationChange) onDurationChange(...args)
  }

  handleEmptied = (...args) => {
    const { actions, onEmptied } = this.props
    actions.handleEmptied(this.getProperties())

    if (onEmptied) onEmptied(...args)
  }

  // Fired when the end of the media resource
  // is reached currentTime == duration
  handleEnded = (...args) => {
    const { actions, onEnded } = this.props
    actions.handleEnded(this.getProperties())

    if (onEnded) onEnded(...args)
  }

  handleError = (...args) => {
    const { actions, onError } = this.props
    actions.handleError(this.getProperties())

    if (onError) onError(...args)
  }

  handleLoadedData = (...args) => {
    const { actions, onLoadedData } = this.props
    actions.handleLoadedData(this.getProperties())

    if (onLoadedData) onLoadedData(...args)
  }

  handleLoadedMetaData = (...args) => {
    const { actions, onLoadedMetadata, startTime } = this.props

    if (startTime && startTime > 0) {
      this.video.currentTime = startTime
    }

    actions.handleLoadedMetaData(this.getProperties())

    if (onLoadedMetadata) onLoadedMetadata(...args)
  }

  handleLoadStart = (...args) => {
    const { actions, onLoadStart } = this.props
    actions.handleLoadStart(this.getProperties())

    if (onLoadStart) onLoadStart(...args)
  }

  handlePause = (...args) => {
    const { actions, onPause } = this.props
    actions.handlePause(this.getProperties())

    if (onPause) onPause(...args)
  }

  handlePlay = (...args) => {
    const { actions, onPlay } = this.props
    actions.handlePlay(this.getProperties())

    if (onPlay) onPlay(...args)
  }

  handlePlaying = (...args) => {
    const { actions, onPlaying } = this.props
    actions.handlePlaying(this.getProperties())

    if (onPlaying) onPlaying(...args)
  }

  handleProgress = (...args) => {
    const { actions, onProgress } = this.props
    if (this.video) {
      actions.handleProgress(this.getProperties())
    }

    if (onProgress) onProgress(...args)
  }

  handleRateChange = (...args) => {}

  handleSeeked = (...args) => {
    const { actions, onSeeked } = this.props
    actions.handleSeeked(this.getProperties())

    if (onSeeked) onSeeked(...args)
  }

  handleSeeking = (...args) => {
    const { actions, onSeeking } = this.props
    actions.handleSeeking(this.getProperties())

    if (onSeeking) onSeeking(...args)
  }

  handleStalled = (...args) => {
    const { actions, onStalled } = this.props
    actions.handleStalled(this.getProperties())

    if (onStalled) onStalled(...args)
  }

  handleSuspend = (...args) => {
    const { actions, onSuspend } = this.props
    actions.handleSuspend(this.getProperties())

    if (onSuspend) onSuspend(...args)
  }

  handleTimeUpdate = (...args) => {
    const { actions, onTimeUpdate } = this.props
    actions.handleTimeUpdate(this.getProperties())

    if (onTimeUpdate) onTimeUpdate(...args)
  }

  handleVolumeChange = (...args) => {
    const { actions, onVolumeChange } = this.props
    actions.handleVolumeChange(this.getProperties())

    if (onVolumeChange) onVolumeChange(...args)
  }

  handleWaiting = (...args) => {
    const { actions, onWaiting } = this.props
    actions.handleWaiting(this.getProperties())

    if (onWaiting) onWaiting(...args)
  }

  renderChildren = () => {
    const props = { ...this.props, video: this.video }

    if (!this.video) {
      return null
    }

    return React.Children.toArray(this.props.children)
      .filter(isVideoChild)
      .map((c) => {
        let cprops
        if (typeof c.type === 'string') {
          if (c.type === 'source') {
            cprops = { ...c.props }
            const preOnError = cprops.onError
            cprops.onError = (...args) => {
              if (preOnError) {
                preOnError(...args)
              }
              this.handleError(...args)
            }
          }
        } else {
          cprops = props
        }
        return React.cloneElement(c, cprops)
      })
  }

  render() {
    const { src, autoPlay } = this.props

    return (
      <div className="html-video-centic-container">
        <video
          muted
          className="video-stream"
          crossOrigin="anonymous"
          ref={(c) => (this.video = c)}
          src={src}
          // muted={true}
          autoPlay={autoPlay}
          // onAbort={this.handleAbort}
          onCanPlay={this.handleCanPlay}
          onCanPlayThrough={this.handleCanPlayThrough}
          // onDurationChange={this.handleDurationChange}
          // onEmptied={this.handleEmptied}
          onEnded={this.handleEnded}
          onError={this.handleError}
          onLoadedData={this.handleLoadedData}
          onLoadedMetadata={this.handleLoadedMetaData}
          onLoadStart={this.handleLoadStart}
          onPause={this.handlePause}
          onPlay={this.handlePlay}
          onPlaying={this.handlePlaying}
          // onProgress={this.handleProgress}
          // onRateChange={this.handleRateChange}
          // onSeeked={this.handleSeeked}
          // onSeeking={this.handleSeeking}
          // onStalled={this.handleStalled}
          // onSuspend={this.handleSuspend}
          // onTimeUpdate={this.handleTimeUpdate}
          // onVolumeChange={this.handleVolumeChange}
          onWaiting={this.handleWaiting}
          tabIndex="-1"
        >
          {this.renderChildren()}
        </video>
      </div>
    )
  }
}

Video.displayName = 'Video'
