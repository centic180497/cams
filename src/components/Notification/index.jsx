import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {Paper, Typography, CircularProgress} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Popper from '@material-ui/core/Popper'
import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import TooltipWrapper from 'components/TooltipWrapper'

import { fetchNotification } from 'actions/action_notification'

import styles from './styles'
import Message from './Message'

class Notification extends Component {
  state = {
    anchorEl: null,
    open: false,
  }

  componentDidMount() {
    this.props.fetchNotification()
  }

  handleClick = event => {
    const { currentTarget } = event
    this.setState(state => ({
      anchorEl: currentTarget,
      // open: !state.open,
    }))
  }
  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }
  render() {
    const { classes, isFetching, data = [], onSelect } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    const id = open ? 'centic-popper' : null
    return (
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography className={classes.headerTitle}>Thông báo</Typography>
        </div>
        <div className={classes.container}>
          {isFetching ? (
            <div className={classes.loading}>
              <CircularProgress size={20} />
            </div>
          ) : (
              <div className={classes.content}>
                {data.length ?
                  data.map((item, index) => (
                    <Message
                      data={item}
                      key={index}
                      onClick={this.handleClose}
                      onSelect={onSelect}
                    />
                  )) : <Typography align="center">Không có thông báo!</Typography>}
              </div>
            )}
        </div>
      </Paper>
    )
  }
}

const mapStateToProps = ({ notification }) => ({
  data: notification.data,
  isFetching: notification.isFetching,
})

export default connect(
  mapStateToProps,
  { fetchNotification },
)(withStyles(styles)(Notification))
