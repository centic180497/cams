import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Replay from '@material-ui/icons/Replay'

class Reload extends Component{
  
  _onClick = (e) => {
    e.stopPropagation()
    const { video } = this.props
    video.hls.attachMedia(video.video)
  }

  render(){
    const { playerControl } = this.props
    return (
      <button
        className="control-button control-button__reload"
        type="button"
        onClick={this._onClick}
      >
        <Replay className="control-button__icon"/>
        <div className="title-tip">Tải lại</div>
      </button>
    )
  }
}

export default Reload