import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grid from '@material-ui/core/Grid'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Menu from '@material-ui/core/Menu'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import ProfileIcon from '@material-ui/icons/AccountCircleOutlined'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { logOut } from '../../actions/action_authetication'

const styles = theme => ({
  root: {
    padding: 0,
  },
  avatar: {
    cursor: 'pointer',
    // margin: 4,
  },
  icon: {
    fontSize: 20,
  },
  listItemIcon: {
    marginRight: 0,
    minWidth:  0
  },
  listItemText: {
    fontSize: '14px !important',
    paddingLeft: 16
  },
  nameWrapper: {
    padding: '5px 16px',
  },
  name: {
    textTransform: 'none',
    fontSize: 16,
    paddingLeft: 5, 
    fontWeight: 500,
  },
  button: {
    // padding: 0
  },
  menuItem: {
    
  }
})

class User extends Component {
  state = {
    open: true,
    anchorEl: null,
  }

  _onAvatarClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  _onClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  _onLogout = () => {
    this.props.history.push('/')
    this.props.logOut()
  }

  render() {
    const { classes, user } = this.props
    const { open, anchorEl } = this.state
    return (
      <div className={classes.root}>
        <Button
          onClick={this._onAvatarClick}
          ref={el => (this.anchorEl = el)}
          className={classes.button}
        >
          <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
          <Typography className={classes.name}>{user.name}</Typography>
          <KeyboardArrowDown />
        </Button>
        <Menu
          open={Boolean(anchorEl)}
          disableAutoFocusItem
          anchorEl={anchorEl}
          onClose={this._onClose}
          PopoverClasses={
            {
              //
            }
          }
        >
          <div className={classes.nameWrapper}>
            <Typography className={classes.name}>{user.name}</Typography>
          </div>
          <MenuItem className={classes.menuItem}>
            <ListItemIcon className={classes.listItemIcon}>
              <ProfileIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              // inset
              primary="Thông tin tài khoản"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </MenuItem>
          <MenuItem onClick={this._onLogout}>
            <ListItemIcon className={classes.listItemIcon}>
              <LogoutIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText
              // inset
              primary="Đăng xuất"
              classes={{
                primary: classes.listItemText,
              }}
            />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      logOut,
    },
  )(withStyles(styles)(User)),
)
