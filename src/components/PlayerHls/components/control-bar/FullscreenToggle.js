import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '@material-ui/icons/Fullscreen'
import FullscreenExit from '@material-ui/icons/FullscreenExit'
import TooltipWrapper from '../../../TooltipWrapper'
import { toggleFullscreen } from '../../actions/player'
import classNames from 'classnames'

class FullscreenToggle extends Component {
  _onClick = () => {
    const { player, actions } = this.props
    actions.toggleFullscreen(player)
  }

  render() {
    const { player } = this.props
    const titleText = player.isFullscreen
      ? 'Thoát khỏi toàn màn hinh'
      : 'Toàn màn hình'
    return (
        <button
          className="control-button control-button__fullscreen"
          onClick={this._onClick}
          type="button"
        >
          {player.isFullscreen ? (
            <FullscreenExit className="control-button__icon" />
          ) : (
            <Fullscreen className="control-button__icon" />
          )}
          <div className="title-tip">{titleText}</div>
        </button>
    )
  }
}
const mapStateToProps = ({ player }) => ({
  player: player,
})

export default FullscreenToggle
