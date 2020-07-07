import React from 'react'
import { Tooltip, Button } from '@material-ui/core'
import {
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
} from '@material-ui/icons'
import store from '../../../../store'
import {
  removeCamFromFollowList,
  addCamToFollowList,
} from 'actions/action_followList'
const dispatch = store.dispatch

export default class FollowToggle extends React.Component {
  componentDidMount(){
    this.forceUpdate()
  }
  handleClick = () => {
    const { player, cam } = this.props
    if (cam.is_in_followlist) {
      dispatch(removeCamFromFollowList([cam.cam_id]))
    } else {
      dispatch(addCamToFollowList([cam.cam_id]))
    }
  }

  render() {
    const { player, cam } = this.props
    const controlText = player.is_in_followlist ? 'Bỏ theo dõi' : 'Theo dõi'
    return (
      <div>
        <Tooltip
          // open
          title={controlText}
          placement="top"
          PopperProps={{
            disablePortal: true,
          }}
        >
          <Button
            className="video-centic-control-button control-button"
            onClick={this.handleClick}
          >
            {cam.is_in_followlist ? (
              <VisibilityOffIcon />
            ) : (
              <VisibilityIcon />
            )}
          </Button>
        </Tooltip>
      </div>
    )
  }
}

FollowToggle.display = 'FollowToggle'
