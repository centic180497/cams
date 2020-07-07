import React, { Component } from 'react'
import FollowToggle from './FollowToggle'
import FullScreenToggle from './FullScreenToggle'
import PlayToggle from './PlayToggle'
import Reload from './Reload'
import LiveToggle from './LiveToggle'
import classNames from 'classnames'
import TakeSnapshot from './TakeSnapshot'

class ControlBar extends Component {
  render() {
    const {
      cam,
      playerControl,
      video,
      handlePlaying,
      handleWaiting,
      handlePlayOrPause,
      handleControlBarMouseEnter,
      handleControlBarMouseLeave,
      handleControlBarMouseOut,
      src,
    } = this.props
    return (
      <div
        className={classNames('control-bar', {
          'control-bar__hide': !playerControl.showControls,
          'control-bar__user-active': playerControl.userActive,
        })}
        onClick={e => e.stopPropagation()}
        onMouseEnter={e => handleControlBarMouseEnter(e)}
        onMouseLeave={e => handleControlBarMouseLeave(e)}
        onMouseOut={e => handleControlBarMouseOut(e)}
      >
        <div className="video-controls__left">
          <PlayToggle
            video={video}
            playerControl={playerControl}
            handlePlayOrPause={handlePlayOrPause}
            handleLive={this.props.handleLive}
            // src={src}
          />
          <Reload video={video} playerControl={playerControl} handlePlaying={handlePlaying} handleWaiting={handleWaiting} />
          {/* <LiveToggle isLive={isLive} reload={handleReload} /> */}
        </div>
        <div className="video-controls__right">
          <TakeSnapshot video={video} handleSnapShot={this.props.handleSnapshot} />
          <FollowToggle cam={cam} />
          <FullScreenToggle
            playerControl={playerControl}
            isFullScreen={this.props.isFullScreen}
            toggleFullScreen={this.props.toggleFullScreen}
            // player={this.props.player}
          />
        </div>
      </div>
    )
  }
}

export default ControlBar
