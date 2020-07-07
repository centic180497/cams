import React, { Component } from 'react'
import Hls from 'hls.js'

class Source extends Component {
  constructor(props, context) {
    super(props, context)
    this.hls = new Hls()
  }

  componentDidMount() {
    const { src, video } = this.props
    console.log(src)
    if (Hls.isSupported()) {
      this.hls.loadSource(src)
      this.hls.attachMedia(video)
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    }
  }
  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy()
    }
  }
  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    )
  }
}

export default Source
