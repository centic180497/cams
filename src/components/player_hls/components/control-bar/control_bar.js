import React from 'react'
import classNames from 'classnames'

import PlayToggle from './play_toggle'
import TimeControl from './time_control'
import FullscreenToggle from './fullscreen_toggle'
import ProcessControl from './progress_control'
import Snapshot from './snapshot'
import Refresh from './refresh'
import FollowToggle from './follow_toggle'

import { mergeAndSortChildren } from '../../utils'

export default class ControlBar extends React.Component {
  getDefaultChildren = () => {
    return [
      <PlayToggle key="play-toggle" order={1} />,
      <Refresh key="refresh" order={2} />,
      // <TimeControl key="time-control" order={2} />,
      // <ProcessControl key="process-control" order={3} />,
      <Snapshot key="snapshot" order={7} />,
      // <Download key="download" order={8} />,
      <FollowToggle key="follow-toggle" order={8} />,
      <FullscreenToggle key="fullscreen-toggle" order={9} />,
    ]
  }

  getDefaultLeftChildren = () => {
    return [
      <PlayToggle key="play-toggle" order={1} />,
      <Refresh key="refresh" order={2} />,
    ]
  }

  getDefaultRightChildren = () => {
    return [
      <Snapshot key="snapshot" order={7} />,
      <FollowToggle key="follow-toggle" order={8} />,
      <FullscreenToggle key="fullscreen-toggle" order={9} />,
    ]
  }

  getLeftChildren = () => {
    const children = React.Children.toArray(this.props.children)
    const defaultChildren = this.props.disableDefaultControls
      ? []
      : this.getDefaultLeftChildren()
    const { className, ...parentProps } = this.props

    return mergeAndSortChildren(defaultChildren, children, parentProps)
  }

  getRightChildren = () => {
    const children = React.Children.toArray(this.props.children)
    const defaultChildren = this.props.disableDefaultControls
      ? []
      : this.getDefaultRightChildren()
    const { className, ...parentProps } = this.props

    return mergeAndSortChildren(defaultChildren, children, parentProps)
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
    const leftChildren = this.getLeftChildren()
    const rightChildren = this.getRightChildren()
    return (
      <div
        className="video-centic-control-bar"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {/* {children} */}
        <div className="control-bar-left">{leftChildren}</div>
        <div className="control-bar-right">{rightChildren}</div>
      </div>
    )
  }
}

ControlBar.display = 'ControlBar'
