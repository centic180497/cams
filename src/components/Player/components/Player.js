import React, { Component } from 'react'
import Hls from 'hls.js'
import _ from 'lodash'

import Video from './Video'
import ControlBar from './ControlBar'
import LoadingSpinner from './LoadingSpinner'
import Header from './Header'
import './player.scss'
import fullscreen from '../utils/fullscreen'

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showControls: false,
      paused: false,
      fullscreen: false,
      waiting: true,
      userActive: false
    }
    this.controlHideTimer = null
    this.video = React.createRef()
    this.player = React.createRef()
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    fullscreen.addEventListener(this.handleFullScreenChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    fullscreen.removeEventListener(this.handleFullScreenChange)
    if (this.controlHideTimer) {
      window.clearTimeout(this.controlHideTimer);
      this.controlHideTimer = null
    }
  }

  handleResize = () => {}

  handleMouseDown = () => {}

  handleMouseMove = () => {
    this.startControlsTimer()
  }

  startControlsTimer = () => {    
    this.setState({
      showControls: true
    })
    const controlBarActiveTime = 2500
    clearTimeout(this.controlHideTimer)
    this.controlHideTimer = setTimeout(() => {
      this.setState({
        showControls: false
      })
    }, controlBarActiveTime)
  }

  stopControlTimer = () => {
    clearTimeout(this.controlHideTimer)
  }

  handleMouseLeave = () => {
    this.setState({
      showControls: false,
    })
  }

  handleControlBarMouseEnter = (e) => {
    // e.stopPropagation()
    if(this.controlHideTimer){
      clearTimeout(this.controlHideTimer)
      this.controlHideTimer = null
    }
    this.setState({
      showControls: true,
      userActive: true
    })
  }

  handleControlBarMouseLeave = (e) => {
    this.setState({
      userActive: false
    })
  }

  handleControlBarMouseOut = (e) => {
    this.setState({
      // userActive: false
    })
  }
  
  handleFocus = () => {}

  handleBlur = () => {}


  handleSnapShot = () => {

  }

  handleFullScreenChange = () => {
    this.setState({
      fullscreen: !this.state.fullscreen,
    })
  }

  toggleFullScreen = () => {
    const player = this.player.current
    if (fullscreen.isFullscreen) {
      fullscreen.exit()
      // fullscreen.request(player)
    } else {
      fullscreen.request(player)
    }
  }

  handlePlayOrPause = () => {
    this.setState({
      paused: !this.state.paused,
    })
  }

  handlePlaying = () => {
    this.setState({
      waiting: false,
      paused: false,
    })
  }
  handleWaiting = () => {
    this.setState({
      waiting: true,
      
    })
  }

  handleReload = () => {
    this.video.hls.on(Hls.Events.ERROR, (event, data) => {
      
    })
  }

  render() {
    const {
      cam
    } = this.props

    if(_.isEmpty(cam.stream_url)){
      return (
        <div className="video-player-error">
          <div>{cam.error}</div>
        </div>
      )
    }
    return (
      <div
        className="video-player"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={this.player}
      >
        <Video
          cam={cam} 
          ref={video => (this.video = video)}
          handlePlayOrPause={this.handlePlayOrPause}
          handlePlaying={this.handlePlaying}
          handleWaiting={this.handleWaiting}
        />
        <Header playerControl={this.state} cam={cam}/>
        <LoadingSpinner 
          playerControl={this.state}
          handlePlaying={this.handlePlaying}
          handleWaiting={this.handleWaiting}
        />
        <ControlBar
          // onMouseEnter={this.handleControlBarMouseEnter}
          // onMouseLeave={this.handleControlBarMouseLeave}
          cam={cam}
          playerControl={this.state}
          handleControlBarMouseEnter={this.handleControlBarMouseEnter}
          handleControlBarMouseLeave={this.handleControlBarMouseLeave}
          handleControlBarMouseOut={this.handleControlBarMouseOut}
          handlePlayOrPause={this.handlePlayOrPause}
          handlePlaying={this.handlePlaying}
          handleWaiting={this.handleWaiting}
          handleSnapShot={this.handleSnapShot}
          toggleFullScreen={this.toggleFullScreen}
          handlePlay={this.handlePlay}
          video={this.video}
          player={this.player}
          handleReload={this.handleReload}
        />
      </div>
    )
  }
}

export default Player
