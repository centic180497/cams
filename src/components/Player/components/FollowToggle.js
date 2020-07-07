import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { removeCamFromFollowList, addCamToFollowList } from '../../../actions/action_followList'

const styles = theme => ({})

class FollowToggle extends Component {
  _onClick = (e) => {
    e.stopPropagation()
    const { cam = {} } = this.props
    if(cam.is_in_followlist){
      this.props.removeCamFromFollowList(Array(cam.cam_id))
    } else {
      this.props.addCamToFollowList(Array(cam.cam_id))
    }
  }
  render() {
    const { cam } = this.props
    const titleText = cam.is_in_followlist ? 'Bỏ theo dõi' : 'Theo dõi'
    return (
      <button
        className="control-button control-button__follow"
        onClick={this._onClick}
      >
        {cam.is_in_followlist ? (
          <VisibilityOff className="control-button__icon" />
        ) : (
          <Visibility className="control-button__icon" />
        )}
        <div className="title-tip">{titleText}</div>
      </button>
    )
  }
}

export default connect(
  null,
  {
    removeCamFromFollowList: removeCamFromFollowList,
    addCamToFollowList: addCamToFollowList
  },
)(FollowToggle)
