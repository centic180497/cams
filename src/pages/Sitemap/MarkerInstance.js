import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog, faEye, faExpand, faPlay } from '@fortawesome/free-solid-svg-icons'
import cx from 'classnames'
import Player from '../../components/Player/components/Player'

class MarkerInstance extends Component {
  state = {
    hoverState: false,
  }

  _onMouseEnter = e => {
    e.stopPropagation()
    this.setState({
      hoverState: true,
    })
  }

  _onMouseLeave = e => {
    e.stopPropagation()
    this.setState({
      hoverState: false,
    })
  }

  _onClick = e => {
    this.props.showInfoWindow(this.props.detail._id)
  }

  render() {
    const isHover = this.props.$hover && this.state.hoverState && !this.props.displayInfoWindow
    const markerStyles = cx(
      'marker-instance',
      this.props.detail.enabled ? 'camera-normal' : 'camera-disable',
      this.props.displayInfoWindow ? 'show-ballon' : '',
      isHover ? 'marker-hover' : '',
    )
    return (
      <div
        className={markerStyles}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        {isHover && (
          <div className="camera-description">
            {/* <div><span>{this.props.detail.name}</span></div> */}
            <div style={{ whiteSpace: 'nowrap' }}>{this.props.detail.name}</div>
            <div style={{ whiteSpace: 'nowrap' }}>IP: {this.props.detail.ip}</div>
          </div>
        )}
        {this.props.displayInfoWindow && (
          <InfoWindow detail={this.props.detail} closeInfoWindow={this.props.closeInfoWindow} />
        )}
      </div>
    )
  }
}

class InfoWindow extends Component {
  closeInfoWindow = e => {
    e.stopPropagation()
    this.props.closeInfoWindow()
  }
  onMouseLeave = e => {
    e.stopPropagation()
  }
  onMouseEnter = e => {
    e.stopPropagation()
  }
  _onClick = e => {
    e.stopPropagation()
  }
  render() {
    return (
      <div
        className="camera-infowindow"
        onClick={this.props.onClick}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onClick}
      >
        <div className="close-infowindow">
          <button
            onClick={this.closeInfoWindow}
            title="Đóng"
            className="btn"
            style={{ padding: '0 5px', width: '100%', height: '100%' }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="card">
          <div className="card-body p-0">
            <div className="live-view">
              <Player streamURL={this.props.detail.stream_url} />
            </div>
          </div>
        </div>
        {/* <div className="infowindow-action">
                    <div className="left-action">
                        <ul style={{display: 'flex', }}>
                            <li>
                                <button title="Play">
                                    <FontAwesomeIcon icon={faPlay} />
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="right-action">
                        <ul style={{display: 'flex'}}>
                            <li>
                                <Link to={`/dashboard/camera/${this.props.detail._id}/`} >
                                    <button  aria-label="Chi tiết" ><FontAwesomeIcon icon={faCog} /></button>
                                </Link>
                            </li>
                            <li>
                                <button title="Theo dõi">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            </li>
                            <li>
                                <button title="Fullscreen">
                                    <FontAwesomeIcon icon={faExpand} />
                                </button>
                            </li>
                        </ul>
                        
                    </div>
                </div> */}
      </div>
    )
  }
}

export default MarkerInstance
