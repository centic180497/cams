import React, { Component } from 'react';
import {Switch, Route, NavLink } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { VideocamOutlined, ScheduleOutlined } from '@material-ui/icons'
import onClickOutside from "react-onclickoutside";
import { toggleSettingsMenu } from '../../actions/action_ui'
import classnames from 'classnames'

class SettingsMenu extends Component{
  handleClickOutside = evt => {
    evt.preventDefault()
    evt.stopPropagation()
    if(this.props.settingsMenu){
      this.props.dispatch(toggleSettingsMenu())
    }else{
      console.log('bbbbbbbbbb')
    }
  };

  handleClick = (type) => {
    const { match, history } = this.props
    switch(type){
      case 'manage-cam':  
        history.push(`${match.path}/manage_cam`)
        break
      default:
        break
    }
  }
  redirectToManageCam =(evt) => {
    const { match, history } = this.props
    history.push(`${match.path}/manage_cam`)
  }

  render(){
    const {match, settingsMenu } = this.props
    return(
      <div className={classnames('settings-menu',{
          "settings-menu-show": !settingsMenu
      })}>
        <span></span>
        <ul>
          <li>
            <button 
              className="settings-menu-button" 
              onClick={this.redirectToManageCam}
            >
              <VideocamOutlined />
              <span className="text">Quản lý camera</span>
            </button>
          </li>
          <li>
            <button 
              className="settings-menu-button"
              onClick={this.handleClick('logs')}
            >
              <ScheduleOutlined />
              <span className="text">Logs</span>
            </button>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ui}) => ({
  settingsMenu: ui.settingsMenu
})


export default withRouter(connect(mapStateToProps)(onClickOutside(SettingsMenu)))