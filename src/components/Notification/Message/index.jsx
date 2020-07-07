import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import styles from './styles'
import { Typography } from '@material-ui/core'
import { readMessage } from 'actions/action_notification'

class Message extends Component {
  handleClick = () => {
    this.props.readMessage(this.props.data.id)
    this.props.onSelect()
  }

  render() {
    const { classes, data } = this.props
    return (
      <Link
        to={{
          pathname: `/dashboard/blacklist/${data.plate_number}`,
          search: `?notif_id=${data.id}`,
        }}
        onClick={this.handleClick}
      >
        <div
          className={classNames(classes.root, {
            [classes.unread]: !data.seen,
          })}
        >
          <div className={classes.imageWrapper}>
            <img
              src={`${data.plate_img}`}
              alt={data.plate_number}
              className={classes.image}
            />
          </div>
          <div className={classes.content}>
            <Typography>
              Đã phát hiện phương tiện biển kiểm soát{' '}
              <span className={classes.text}>{data.plate_number} </span>
              tại camera{' '}
              <span className={classes.text}>{data.camera.name}</span>
            </Typography>
            <Typography>{data.timestamp}</Typography>
          </div>
        </div>
      </Link>
    )
  }
}

export default connect(null, { readMessage})(withStyles(styles)(Message))
