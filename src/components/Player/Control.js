import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEyeSlash,
  faExpand,
  faPlay,
  faPause,
  faCompress,
} from '@fortawesome/free-solid-svg-icons'

class Control extends Component {
  render() {
    const { showControls } = this.props
    return (
      <div
        className={
          showControls
            ? 'video-controls'
            : 'video-controls video-controls--hide'
        }
      >
        <div className="video-controls__left">
          <div className="video-control__play video-controls__tip-btn video-control__play--pause">
            <button className="btn-action play">
              <FontAwesomeIcon icon={faPlay} />
            </button>
            <div className="video-controls__title-tip">Pause</div>
          </div>
          <div className="video-control__live video-controls__tip-btn">
            <button className="btn-action live">Live</button>
            <div className="video-controls__title-tip">Live</div>
          </div>
        </div>
        <div className="video-controls__right">
          <div className="video-control__follow video-controls__tip-btn">
            <button className="btn-action follow">
              <FontAwesomeIcon icon={faEyeSlash} />
            </button>
            <div className="video-controls__title-tip">Bỏ theo dõi</div>
          </div>
          <div className="video-control__fullscreen video-controls__tip-btn">
            <button className="btn-action fullscreen">
              <FontAwesomeIcon icon={faExpand} />
            </button>
            <div className="video-controls__title-tip">FullScreen</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Control
