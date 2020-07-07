import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import fullscreen from '../utils/fullscreen'

const styles = theme => ({})

class FullScreenToggle extends Component {
  componentDidMount() {}

  handleClick = e => {
    e.stopPropagation()
    this.props.toggleFullScreen()
  }

  render() {
    const { playerControl } = this.props
    const titleText = playerControl.fullscreen
      ? 'Thoát khỏi toàn màn hình'
      : 'Toàn màn hình'
    return (
      <button
          className="control-button control-button__fullscreen"
          onClick={this.handleClick}
          type="button"
        >
          {playerControl .fullscreen ? (
            <FullscreenExit className="control-button__icon" />
          ) : (
            <Fullscreen className="control-button__icon" />
          )}
          <div className="title-tip">{titleText}</div>
        </button>
    )
  }
}

export default withStyles(styles)(FullScreenToggle)
