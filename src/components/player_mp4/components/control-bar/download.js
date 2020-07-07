import React from 'react'
import { Tooltip, Button } from '@material-ui/core'
import { GetApp as DownloadIcon } from '@material-ui/icons'

export default class Download extends React.Component {
  handleClick = () => {
    const { actions, player } = this.props
    if (player.error) return

    actions.download(player)
  }

  render() {
    const { player } = this.props
    const controlText = 'Tải xuống'
    return (
      <Tooltip
        title={controlText}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        <Button
          className="video-centic-control-button control-button"
          onClick={this.handleClick}
        >
          <DownloadIcon />
        </Button>
      </Tooltip>
    )
  }
}

Download.display = 'Download'