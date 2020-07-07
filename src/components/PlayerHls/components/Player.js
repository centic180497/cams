import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { handleFullscreenChange } from '../actions/player'
import ControlBar from './control-bar/ControlBar'
import Video from './Video'
import LoadingSpinner from './LoadingSpinner'
import { mergeAndSortChildren, isVideoChild, throttle } from '../utils'
import fullscreen from '../utils/fullscreen'
import Manager from '../Manager'
import './player.scss'

const styles = theme => ({
  root: {
    position: 'relative',
    width: '100%',
    maxHeight: '100%',
    height: 0,
    paddingTop: '56.25%',
    // backgroundColor: theme.palette.common.black,
  },
})

class Player extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.video = React.createRef()
    this.player = React.createRef()
    this.manager = new Manager(props.store)
    this.actions = this.manager.getActions()
    this.manager.subscribeToPlayerStateChange(
      this.handleStateChange.bind(this)
    )
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
    fullscreen.addEventListener(this.handFullscreenChange)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    fullscreen.removeEventListener(this.handleFullscreenChange)
  }

  handleResize = () => {}

  handFullscreenChange = () => {
    console.log('change fullscreen')
    this.actions.handleFullscreenChange(fullscreen.isFullscreen)
  }

  getDefaultChildren(originalChildren) {
    return [
      <Video
        key="video"
        order={0.0}
        ref={el => {
          this.video = el;
          this.manager.video = this.video ? this.video.video : null
        }}
      />,
      <LoadingSpinner key="loading-spinner" order={1.0} />,
      <ControlBar key="control-bar" order={2.0} />
    ]
  }

  getChildren = props => {
    const {
      className: _, //remove classname,
      children: originalChildren,
      ...propsWithoutChildren
    } = props
    const children = React.Children.toArray(this.props.children).filter(
      e => !isVideoChild(e),
    )
    const defaultChildren = this.getDefaultChildren(originalChildren);
    return mergeAndSortChildren(
      defaultChildren,
      children,
      propsWithoutChildren
    )
  }
  //get redux state
  getState = () => {
    return this.manager.getState()
  }

  // play video
  play = () => {
    this.video.play()
  }

  //pause video 
  pause = () => {
    this.video.pause()
  }

  handleStateChange = (state, prevState) => {
    if(state.isFullscreen !== prevState.isFullscreen){
      this.handleResize()
    }
    this.forceUpdate()
  }
  componentDidUpdate(){
    console.log('force update')
  }
  render() {
    const { player } = this.manager.getState()
    const {
      paused, 
      waiting
    } = player
    const props = {
      ...this.props,
      player,
      actions: this.actions,
      manager: this.manager,
      store: this.manager.store,
      video: this.video ? this.video.video : null
    }
    const children = this.getChildren(props)
    return (
      <div 
        className="video-player"
        ref={el => {
          this.manager.rootElement = el
        }}
      >
        {children}
      </div>
    )
  }
}


export default Player
