import React from 'react'
import {connect } from 'react-redux'
import { enqueueSnackbar} from 'actions/action_snackbar'
import { withStyles } from '@material-ui/core/styles'
import CameraAltIcon from '@material-ui/icons/CameraAlt'

class TakeSnapshot extends React.Component {
  handleClick = e => {
    const { video } = this.props
    const w = video.video.videoWidth
    const h = video.video.videoHeight
    if(w === 0 || h === 0){
      this.props.enqueueSnackbar({
        message: 'Xảy ra lỗi',
        options: {
          // variant: 'info'
        }
      })
      return 
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    

    canvas.width = w
    canvas.height = h
    
    context.fillRect(0, 0, w, h)
    context.drawImage(video.video, 0, 0, w, h)

    const link = document.createElement('a')
    link.setAttribute('download', `snapshot_${new Date().getTime()}.png`)
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"))
    link.click()
  }

  render() {
    const titleText = 'Chụp ảnh'
    return (
      <button className="control-button control-button__snapshot" onClick={this.handleClick}>
        <CameraAltIcon className="control-button__icon" />
        <div className="title-tip">{titleText}</div>
      </button>
    )
  }
}

export default connect(null, {enqueueSnackbar})(TakeSnapshot)
