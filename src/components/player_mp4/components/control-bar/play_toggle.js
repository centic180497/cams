import React from 'react'
import { Button, Tooltip } from '@material-ui/core'
import { PlayArrow as PlayIcon, Pause as PauseIcon } from '@material-ui/icons'

export default class PlayToggle extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    const { actions, player } = this.props
    if (player.error) return
    if (player.paused) {
      actions.play()
    } else {
      actions.pause()
    }
  }

  render() {
    const { player } = this.props
    const controlText = player.paused ? 'Phát (k)' : 'Dừng (k)'

    return (
      <div>
        <Tooltip
          title={controlText}
          placement="top-start"
          PopperProps={{
            disablePortal: true,
          }}
        >
          <Button
            className="video-centic-control-button control-button"
            onClick={this.handleClick}
          >
            {player.paused ? <PlayIcon /> : <PauseIcon />}
          </Button>
        </Tooltip>
      </div>
    )
  }
}

PlayToggle.display = 'PlayToggle'
