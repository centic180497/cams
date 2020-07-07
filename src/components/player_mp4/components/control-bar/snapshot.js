import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { CameraAlt as CameraIcon } from '@material-ui/icons'

export default class Snapshot extends React.Component {
  handleClick = () => {
    const { actions, player } = this.props
    if (player.error) return
    actions.snapshot()
  }

  render() {
    const { player } = this.props
    const controlText = 'Chụp ảnh (c)'
    return (
      <div>
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
            <CameraIcon />
          </Button>
        </Tooltip>
      </div>
    )
  }
}
