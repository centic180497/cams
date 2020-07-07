import React, { Component } from 'react'
import Source from './Source'
import Hls from 'hls.js'

class Video extends Component {
  constructor(props) {
    super(props)
    this.video = React.createRef()
    this.hls = new Hls({
      liveBackBufferLength: 0,
    })
  }

  componentDidMount() {
    const { cam = {} } = this.props
    if (Hls.isSupported()) {
      const video = this.video
      const { stream_url } = cam
      this.hls.attachMedia(video)
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        this.hls.loadSource(cam.stream_url)
      })
      this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
            })
        }
      })
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
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
        } else {
          this.props.handleWaiting()
        }
      })
      this.hls.on(Hls.Events.BUFFER_APPENDED, (event, data) => {})
    }
  }
  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  }

  _onPlaying = () => {
    this.props.handlePlaying()
  }

  _onWaiting = () => {
    this.props.handleWaiting()
  }

  render() {
    return (
      <video
        // autoPlay
        muted
        className="centic-video"
        onWaiting={this._onWaiting}
        onPlaying={this._onPlaying}
        ref={(c) => (this.video = c)}
      />
    )
  }
}

export default Video
