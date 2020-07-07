import React, { Component } from 'react'

class LiveToggle extends Component {
  handleClick = e => {
    e.stopPropagation()
    this.props.reload()
  }
  render() {
    const { isLive } = this.props
    return (
      <div className="video-control__live video-controls__tip-btn">
        <button
          className="btn-action live"
          // disabled={isLive ? true : false}
          onClick={this.handleClick}
        >
          Live
        </button>
        <div className="video-controls__title-tip">Live</div>
      </div>
    )
  }
}

export default LiveToggle
