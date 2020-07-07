import React from 'react'
import { Tooltip, Button } from '@material-ui/core'
import { Refresh as RefreshIcon } from '@material-ui/icons'

export default class Refresh extends React.Component {
  handleClick = () => {
    const { video } = this.props.manager
    video.hls.attachMedia(this.props.video)
  }

  render() {
    const controlText = 'Tải lại'
    return (
      <Tooltip
        title={controlText}
        placement="top"
        PopperProps={{
          disablePortal: true,
        }}
      >
        <Button
          className="video-centic-control-button control-button"
          onClick={this.handleClick}
        >
          <RefreshIcon />
        </Button>
      </Tooltip>
    )
  }
}

Refresh.display = 'Refresh'
