import React, { Component } from 'react'
import { PlayArrow, Pause } from '@material-ui/icons'

class PlayToggle extends Component {
  _onClick = () => {

    const { player, actions, video } = this.props

    if (player.paused) {
      console.log('playing')
      // video.get(0).play()
    } else {
      console.log('playing')
      // video.get(0).pause()
    }
  }
  render() {
    const { player } = this.props
    const titleText = player.paused ? 'Phát' : 'Dừng'
    return (
      <button
        className="control-button control-button__play"
        type="button"
        onClick={this._onClick}
      >
        {player.paused ? (
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
