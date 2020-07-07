import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { handleWaiting, handlePlaying } from '../actions/video'
import Hls from 'hls.js'


class Video extends Component{
  constructor(props){
    super(props)
    this.hls = new Hls()
  }

  componentDidMount(){
    const { actions } = this.props
    if(Hls.isSupported()){
      const video = this.video
      this.hls.attachMedia(video)
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        
        console.log('MEDIA_ATTACHED')
        // this.hls.loadSource("http://10.49.46.54:3000/hls/231/index.m3u8")
        this.hls.loadSource("https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8")
      })
      this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('MANIFEST_PARSED')
        video.play().then(_ => {
        
          console.log('video playback started')
        }).catch(e => console.log(e))

        console.log('PLAY STREAM SRC=' + "http://10.49.46.54:3000/hls/231/index.m3u8")
      })

      this.hls.on(Hls.Events.FRAG_BUFFERED, () => {
        actions.handlePlaying()
      })
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        console.log(event, data)
        if(data.fatal){
          switch(data.type){
            case Hls.ErrorTypes.NETWORK_ERROR:
              this.hls.startLoad()
              break
            case Hls.ErrorTypes.MEDIA_ERROR:
              this.hls.recoverMediaError()
              break
            default:
              this.hls.destroy()
              break
          }
        } else {
          switch(data.type){
            case Hls.ErrorDetails.MEDIA_ERROR:
              
            default:
              break;
          }
        }
      })

    }
  }
  componentWillUnmount(){
    if(this.hls){
      this.hls.destroy()
    }
  }
  _onWaiting = () => {
    this.props.actions.handleWaiting()
  }
  _onError = (args) => {
    
    
  }
  _onPlaying = () => {
    this.props.actions.handlePlaying()
  }
  render(){
    const {
    } = this.props
    return (
      <video 
        className='centic-video'
        onError = {this._onError}
        onWaiting={this._onWaiting}
        onPlaying={this._onPlaying}
        ref={el => this.video = el}
      />
    )
  }
}

export default Video