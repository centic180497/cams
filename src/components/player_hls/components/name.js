import React from 'react'
import { Typography } from '@material-ui/core'

export default class Name extends React.Component {
  render(){
    return (
      <div className="video-centic-cam-name">
        <Typography noWrap>
          {this.props.cam.cam_name}
        </Typography>
      </div>
    )
  }
}

Name.display = 'Name'