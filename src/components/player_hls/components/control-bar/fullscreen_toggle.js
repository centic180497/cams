import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import {
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from '@material-ui/icons'

export default class FullscreenToggle extends React.Component {
  handleClick = () => {
    const { player, actions } = this.props
    actions.toggleFullscreen(player)
  }

  render() {
    const { player } = this.props
    const controlText = player.isFullscreen
      ? 'Thoát khỏi toàn màn hình (f)'
      : 'Toàn màn hình (f)'
    return (
      <Tooltip
        title={controlText}
        placement="top-end"
        PopperProps={{
          disablePortal: true,
        }}
      >
        <Button
          className="video-centic-control-button control-button"
          onClick={this.handleClick}
        >
          {player.isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
      </Tooltip>
    )
  }
}

FullscreenToggle.display = 'FullscreenToggle'
