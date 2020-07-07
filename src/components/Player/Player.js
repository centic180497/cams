import React, { Component } from 'react'
import Control from './Control'
import Hls from 'hls.js'

class VideoPlayer extends Component {
  constructor(props) {
    super(props)
    this.hls = new Hls()
    this.state = {
      isLoading: true,
      isFullScreen: false,
      isLive: true,
      isShowControls: false,
    }
  }

  saveRef = ref => (this.player = ref)
  componentDidMount() {
    if (Hls.isSupported() && this.player) {
      const video = this.player
      this.hls.loadSource('http://10.49.46.54:3000/hls/231/index.m3u8')
      this.hls.attachMedia(video)
      this.hls.on(Hls.Events.MANIFEST_LOADING, function() {
        video.play()
      })
      this.hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play()
      })
    }
  }

  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  }

  showControls = () => {
    this.setState({
      isShowControls: true,
    })
  }
  hideControls = () => {
    this.setState({
      isShowControls: false,
    })
  }
  render() {
    return (
      <div
        className="video-player"
        onMouseEnter={this.showControls}
        onMouseLeave={this.hideControls}
      >
        <div className="real-player">
          <div className="real-player__bg-wrapper" />
          <div className="real-player__content-container">
            <div className="player-live">
              <div className="centic-video-container">
                <div className="centic-video">
                  <video className="centic-video" ref={this.saveRef} />
                  {!this.state.isLoading && (
                    <div className="real-player__loading-wrapper">
                      <div className="real-player__loading">
                        <div className="loader" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Control showControls={this.state.isShowControls} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoPlayer
