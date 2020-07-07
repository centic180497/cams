import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { IconButton, Popover, Badge, Tooltip } from '@material-ui/core'
import {
  NotificationsNone as NotificationsNoneIcon,
  SearchOutlined,
} from '@material-ui/icons'

import logo from '../../assets/images/logo_copy.png'
import logoVanLang from '../../assets/images/logo_vanlang.jpg'
import logoQN from '../../assets/images/logo_quangnam.png'
// import Size from '../Pages/FollowList/Size'
// import Pagination from '../Pages/FollowList/Pagination'

import { toggleCameraFilter, toggleDrawer } from '../../actions/action_ui'
import FollowListSize from './FollowListSize'
import Size from './Size'
import Pagination from './Pagination'
import User from './User'
import Group from './group'
import Notification from '../Notification'

import {
  connectNotification,
  unreadCount,
  fetchNotification,
} from 'actions/action_notification'

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: 51,
    // position: 'fixed',
    // top: 0,
    // left: 0,
    // right: 0,
    zIndex: 20,
    boxShadow: '0 0 35px 0 rgba(154,161,171,.3)',
    borderBottom: '1px solid #ddd',
    background: '#fff',
  },
  button: {
    margin: 8,
  },
  logoWrapper: {
    height: 50,
    // padding: '10px 10px 10px 10px',
    textAlign: 'center',
    borderRight: '2px solid #ccc',
  },
  logoImage: {
    padding: 10,
    height: '100%',
    // paddingBottom: 1,
    cursor: 'pointer',
  },
  titlePage: {
    marginRight: 'auto',
    display: 'flex',
    padding: '6px 24px',
    fontSize: 16,
    fontWeight: 500,
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    // paddingRight: 18,
    // paddingLeft: 18,
  },
  smallIcon: {
    fontSize: 20,
  },
  rightControls: {
    display: 'flex',
    borderLeft: '1px solid #ccc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  leftControls: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 10,
    // height: '100%',
  },
  followList: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  iconButton: {
    height: 44,
  },
})

class Header extends Component {
  state = {
    anchorEl: null,
    open: false,
  }

  componentDidMount() {
    this.props.connectNotification()
    this.props.fetchNotification()
  }

  _onToggleCamFilter = (event) => {
    this.props.toggleCameraFilter()
  }

  _onToggleDrawer = () => {
    this.props.toggleDrawer()
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  render() {
    const {
      classes,
      location,
      isFollowListPage,
      cameraHeaderMenu,
      unread,
    } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const id = open ? 'centic-popper' : null
    const pathname = location.pathname

    let titlePage = ''

    if (pathname.indexOf('/dashboard/sitemap') !== -1) {
      titlePage = 'BẢN ĐỒ CAMERA'
    }
    if (pathname.indexOf('/dashboard/follow_list') !== -1) {
      titlePage = 'DANH SÁCH THEO DÕI'
    }
    if (pathname.indexOf('/dashboard/manage_cam') !== -1) {
      titlePage = 'QUẢN LÝ CAMERA'
    }
    if (pathname.indexOf('/dashboard/search_vehicles') !== -1) {
      titlePage = 'TÌM KIẾM PHƯƠNG TIỆN'
    }
    if (pathname.indexOf('/dashboard/blacklist') !== -1) {
      titlePage = 'DANH SÁCH ĐEN'
    }
    if (pathname.indexOf('/dashboard/record_videos') !== -1) {
      titlePage = 'QUẢN LÝ VIDEO'
    }
    if (pathname.indexOf('/dashboard/violations') !== -1) {
      titlePage = 'VI PHẠM'
    }
    if (pathname.indexOf('/dashboard/flow') !== -1) {
      titlePage = 'LƯU LƯỢNG'
    }
    if (pathname.indexOf('/dashboard/light_period') !== -1) {
      titlePage = 'CHU KỲ ĐÈN'
    }
    if (pathname.indexOf('/dashboard/waiting_period') !== -1) {
      titlePage = 'THỜI GIAN CHỜ TRUNG BÌNH'
    }
    if (pathname.indexOf('/dashboard/traffic_light') !== -1) {
      titlePage = 'ĐIỀU KHIỂN ĐÈN TÍN HIỆU'
    }

    return (
      <header className={classes.root}>
        <div className={classes.logoWrapper}>
          <img src={logo} className={classes.logoImage} alt="Centic logo" />
          {/* &
          <img
            src={logoVanLang}
            className={classes.logoImage}
            alt="Centic logo"
          /> */}
        </div>
        <div className={classes.titlePage}>{titlePage}</div>
        <div className={classes.nav}>
          <div className={classes.leftControls}>
            {location.pathname === '/dashboard/sitemap' && (
              <Tooltip arrow title="Tìm kiếm nâng cao">
                <IconButton onClick={this._onToggleCamFilter}>
                  <SearchOutlined className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
            )}
            {location.pathname === '/dashboard/follow_list' && (
              // <FollowListSize />
              <div className={classes.followList}>
                <Group />
                <Pagination />
                <Size />
              </div>
            )}
          </div>
          <div className={classes.rightControls}>
            <Tooltip arrow title="Thông báo">
              <IconButton
                onClick={this.handleClick}
                className={classes.iconButton}
              >
                <Badge badgeContent={unread} color="primary" max={99}>
                  <NotificationsNoneIcon className={classes.smallIcon} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={this.handleClose}
            >
              <Notification onSelect={this.handleClose} />
            </Popover>
            {/* <Notification /> */}
            <User />
          </div>
        </div>
      </header>
    )
  }
}

const mapStateToProps = ({ followList, cameras, notification }) => ({
  unread: notification.unread,
  // isFollowListPage: followList.isCurrentPage,
  // cameraHeaderMenu: cameras.headerMenu
})

export default withRouter(
  connect(mapStateToProps, {
    toggleCameraFilter,
    toggleDrawer,
    connectNotification,
    unreadCount,
    fetchNotification,
  })(withStyles(styles)(Header)),
)
