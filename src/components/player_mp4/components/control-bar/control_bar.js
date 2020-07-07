import React from 'react'
import classNames from 'classnames'

import PlayToggle from './play_toggle'
import TimeControl from './time_control'
import FullscreenToggle from './fullscreen_toggle'
import ProcessControl from './progress_control'
import Snapshot from './snapshot'
import Download from './download'
import Rate from './rate'

import { mergeAndSortChildren } from '../../utils'

export default class ControlBar extends React.Component {
  getDefaultChildren = () => {
    return [
      <PlayToggle key="play-toggle" order={1} />,
      <TimeControl key="time-control" order={2} />,
      <ProcessControl key="process-control" order={3} />,
      <Snapshot key="snapshot" order={7} />,
      <Download key="download" order={8} />,
      <Rate key="rate" order={9} />,
      <FullscreenToggle key="fullscreen-toggle" order={10} />,
    ]
  }

  getChildren = () => {
    const children = React.Children.toArray(this.props.children)

    const defaultChildren = this.props.disableDefaultControls
      ? []
      : this.getDefaultChildren()

    const { className, ...parentProps } = this.props

    return mergeAndSortChildren(defaultChildren, children, parentProps)
  }

  handleMouseEnter = (e) => {
    this.props.actions.controlBarActive(true)
  }

  handleMouseLeave = (e) => {
    this.props.actions.controlBarActive(false)
  }

  render() {
    const children = this.getChildren()
    return (
      <div
        className="video-centic-control-bar"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
      </div>
    )
  }
}

ControlBar.display = 'ControlBar'
