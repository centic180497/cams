import React from 'react'
import classNames from 'classnames'

import Manager from '../manager'

import Video from './video'
import ControlBar from './control-bar/control_bar'
import Shorcut from './shortcut'
import LoadingSpinner from './loading_spinner'
import Name from './name'
import BigPlayButton from './big_play_button'
import Bezel from './bezel'

import { isVideoChild, throttle, mergeAndSortChildren } from '../utils'
import fullscreen from '../utils/fullscreen'

import '../styles/video.scss'

export default class Player extends React.Component {
  constructor(props) {
    super(props)

    this.controlsHideTimer = null

    this.video = null
    this.manager = new Manager(props.store)
    this.actions = this.manager.getActions()
    this.manager.subscribeToPlayerStateChange(this.handleStateChange.bind(this))
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)

    fullscreen.addEventListener(this.handleFullscreenChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)

    fullscreen.removeEventListener(this.handleFullscreenChange)

    if (this.controlsHideTimer) {
      window.clearTimeout(this.controlsHideTimer)
    }
  }

  getDefaultChildren = (originalChildren) => {
    return [
      <Video
        ref={(c) => {
          this.video = c
          this.manager.video = this.video
        }}
        key="video"
        order={0.0}
      >
        {originalChildren}
      </Video>,
      <Name key="name" order={1.0} />,
      <LoadingSpinner key="loading-spinner" order={2.0} />,
      <Bezel key="bezel" order={3.0} />,
      <BigPlayButton key="big-play-button" order={4.0} />,
      <ControlBar key="control-bar" order={5.0} />,
      <Shorcut key="shortcut" order={99.0} />,
    ]
  }

  getChildren = (props) => {
    const {
      className: _,
      children: originalChildren,
      ...propsWithoutChildren
    } = props

    const children = React.Children.toArray(this.props.children).filter(
      (e) => !isVideoChild(e),
    )

    const defaultChildren = this.getDefaultChildren(originalChildren)

    return mergeAndSortChildren(defaultChildren, children, propsWithoutChildren)
  }

  handleResize = () => {}

  subscribeToStateChange(listener) {
    return this.manager.subscribeToPlayerStateChange(listener)
  }

  handleFullscreenChange = (event) => {
    if (event.target === this.manager.rootElement) {
      this.actions.handleFullscreenChange(fullscreen.isFullscreen)
    }
  }

  handleStateChange = () => {
    this.forceUpdate()
  }

  startControlsTimer = () => {
    let controlBarActiveTime = 3000
    React.Children.forEach(this.props.children, (element) => {
      if (!React.isValidElement(element) || element.type !== ControlBar) return
    })

    this.actions.userActivate(true)
    clearTimeout(this.controlsHideTimer)

    this.controlsHideTimer = setTimeout(() => {
      this.actions.userActivate(false)
    }, controlBarActiveTime)
  }

  handleMouseDown = () => {
    this.startControlsTimer()
  }

  handleMouseMove = () => {
    this.startControlsTimer()
  }

  handleKeyDown = () => {
    this.startControlsTimer()
  }

  handleFocus = () => {
    this.actions.activate(true)
  }

  handleBlur = () => {
    this.actions.activate(false)
  }

  render() {
    const { player } = this.manager.getState()

    const props = {
      ...this.props,
      player,
      actions: this.actions,
      manager: this.manager,
      store: this.manager.store,
      video: this.video ? this.video.video : null,
    }

    const children = this.getChildren(props)

    return (
      <div
        className={classNames(
          {
            'video-centic-paused': player.paused,
            'video-centic-seeking': player.seeking,
            'video-centic-waiting': player.waiting,
            'video-centic-user-inactive': !player.userActivity,
            'video-centic-user-active': player.userActivity,
            'video-centic-show-control-bar': player.showControlBar,
          },
          'video-centic video-centic-player',
          this.props.className,
        )}
        ref={(c) => (this.manager.rootElement = c)}
        onTouchStart={this.handleMouseDown}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onMouseMove={this.handleMouseMove}
        onKeyDown={this.handleKeyDown}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        tabIndex="-1"
      >
        {children}
      </div>
    )
  }
}
