import React, { Component } from 'react'
import classNames from 'classnames'

class Header extends Component{
  render(){
    const { playerControl, cam } = this.props
    return(
      <div className={classNames('player-header', {
        'player-header__hide': !playerControl.showControls,
        'player-header__user-active': playerControl.userActive
      })}>
        <div className="player-header-text">
          {cam.cam_name}
        </div>
      </div>
    )
  }
}

export default Header