import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import _ from 'lodash'
import { cancelFocusVehicleHistory } from 'actions/action_blackList'

import styles from './styles'

class InfoWindow extends Component {
  _onClose = () => {
    this.props.closeHoverInfo()
    this.props.cancelFocusVehicleHistory()
  }
  render() {
    const { classes, data} = this.props
    return (
      <div className={classes.popper}>
        <div className={classes.tooltip}>
          <div className={classes.header}>
            <IconButton className={classes.iconButton} onClick={this._onClose}>
              <ClearOutlined className={classes.icon} />
            </IconButton>
          </div>
          <div className={classes.info}>
            <Typography noWrap className={classes.plate}>
              Biển số xe: {data.plate_number}
            </Typography>
            <Typography noWrap className={classes.camName}>
              {_.get(data, 'camera.name')}
            </Typography>
            <Typography noWrap className={classes.time}>
              {data.timestamp}
            </Typography>
            <Typography noWrap className={classes.address}>
              {data.address}
            </Typography>
          </div>
          <div className={classes.imageWrapper}>
            <img
              src={`${data.object_img}`}
              className={classes.image}
            />
          </div>
          <span className="arrow-left" />
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  { cancelFocusVehicleHistory },
)(withStyles(styles)(InfoWindow))
