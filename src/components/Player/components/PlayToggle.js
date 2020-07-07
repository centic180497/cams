import React, { Component } from 'react'
import PlayArrow from '@material-ui/icons/PlayArrow'
import Pause from '@material-ui/icons/Pause'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

class PlayToggle extends Component {
  _onClick = e => {
    e.stopPropagation()
    this.props.handlePlayOrPause()
    const { video } = this.props
    if (video.video.paused) {
      video.video.play()
    } else {
      video.video.pause()
    }
  }
  render() {
    const { playerControl } = this.props
    const titleText = playerControl.paused ? 'Phát' : 'Dừng'
    return (
      <button
        className="control-button control-button__play"
        type="button"
        onClick={this._onClick}
      >
        {playerControl.paused ? (
          <PlayArrow className="control-button__icon" />
        ) : (
          <Pause className="control-button__icon" />
        )}
        <div className="title-tip">{titleText}</div>
      </button>
    )
  }
}

export default PlayToggle
