import React from 'react'
import classNames from 'classnames'
import { IconButton } from '@material-ui/core'
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Forward5 as Forward5Icon,
  Replay5 as Replay5Icon,
} from '@material-ui/icons'

export default class Bezel extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.timer = null

    props.manager.subscribeToOperationStateChange(
      this.handleStateChange.bind(this),
    )

    this.state = {
      hidden: true,
      operation: {},
    }
  }

  handleStateChange = (state, prevState) => {
    if (
      state.count !== prevState.count &&
      state.operation.source === 'shortcut'
    ) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      this.setState({
        hidden: false,
        count: state.count,
        operation: state.operation,
      })

      this.timer = setTimeout(() => {
        this.setState({
          hidden: true,
        })
      }, 500)
    }
  }

  render() {
    if (this.state.operation.source !== 'shortcut') {
      return null
    }
    const style = this.state.hidden ? { display: 'none' } : null

    let icon = null
    switch (this.state.operation.action) {
      case 'play':
        icon = <PlayIcon className="video-centic-bezel-icon" />
        break
      case 'pause':
        icon = <PauseIcon className="video-centic-bezel-icon" />
        break
      case 'forward-5':
        icon = <Forward5Icon className="video-centic-bezel-icon" />
        break
      case 'replay-5':
        icon = <Replay5Icon className="video-centic-bezel-icon" />
        break
      default:
        break
    }
    return (
      <div
        className={classNames({
          'video-centic-bezel': true,
          'video-centic-bezel-animation': this.state.count % 2 === 0,
          'video-centic-bezel-animation-alt': this.state.count % 2 === 1,
        })}
        style={style}
        role="status"
        aria-label={this.state.operation.action}
      >
        <IconButton>{icon}</IconButton>
      </div>
    )
  }
}

Bezel.display = 'Bezel'
