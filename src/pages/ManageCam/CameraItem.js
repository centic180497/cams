import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Switch,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import {
  Settings as SettingsIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'
import {
  focusOnCam,
  configCam,
  getCamConnection,
  deleteCam,
  changeCamStatus,
} from '../../actions/action_camera'
import { showDeleteCamModal } from '../../actions/action_modal'
import { Dialog, Tooltip } from '@material-ui/core'

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginTop: 5,
    // marginRight: 15,
    cursor: 'pointer',
  },
  focused: {
    backgroundColor: '#e0e0e0',
  },
  cardMediaWrapper: {
    width: 130,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
  },
  details: {
    width: 'calc(100% - 130px)',
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  cardMedia: {
    width: '100%',
    paddingTop: '56.25%',
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  iconButton: {
    padding: 6,
  },
  icon: {
    fontSize: 16,
  },
  name: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 500,
  },
  address: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  description: {
    lineHeight: '1.5em',
    fontSize: '0.825rem',
  },
  switchBase: {
    height: 20,
  },
  dialog: {
    pointerEvents: 'none',
  },
  process: {
    padding: '0 22px',
  },
})
class CameraItem extends Component {
  state = {
    open: false,
  }

  handleClick = (e) => {
    e.stopPropagation()
    const { lat, lng, id } = this.props.detail
    this.props.focusOnCam({
      center: { lat, lng },
      zoom: 15,
      id,
    })
  }

  _onMouseLeave = () => {}
  _onMouseLeave = () => {}
  _onSwitchChange = (id, status) => (e) => {
    e.stopPropagation()
    let nextStatus
    if (status === 'disabled') {
      nextStatus = 'enabled'
    } else {
      nextStatus = 'disabled'
    }

    this.props.changeCamStatus(id, {
      status: nextStatus,
    })
  }
  handleConfigsClick = (e) => {
    e.stopPropagation()
    const { id, lat, lng, name, ip } = this.props.detail
    this.props.configCam({
      center: { lat, lng },
      name,
      ip,
      zoom: 15,
      id,
    })
    // this.props.getCamConnection({
    //   center: { lat, lng },
    //   zoom: 15,
    //   id
    // })
  }

  handleDeleteClick = () => {
    this.props.showDeleteCamModal(this.props.detail)
  }

  render() {
    const { classes, detail, focusedCam, changingCamStatus } = this.props
    const isFocused = focusedCam === detail.id
    return (
      <div>
        <Card
          className={classNames(classes.card, {
            [classes.focused]: isFocused,
          })}
          onClick={this.handleClick}
          onMouseEnter={this._onMouseEnter}
          onMouseLeave={this._onMouseLeave}
        >
          <div className={classes.cardMediaWrapper}>
            <CardMedia className={classes.cardMedia} image={detail.thumnail} />
          </div>
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography noWrap className={classes.name}>
                {detail.name}
              </Typography>
              <Typography noWrap className={classes.address}>
                {detail.address}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <Fragment>
                <Tooltip arrow title="Cấu hình">
                  <IconButton
                    className={classes.iconButton}
                    onClick={this.handleConfigsClick}
                  >
                    <SettingsIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow title="Xóa">
                  <IconButton
                    className={classes.iconButton}
                    onClick={this.handleDeleteClick}
                  >
                    <DeleteIcon className={classes.icon} />
                  </IconButton>
                </Tooltip>
                {detail.id === changingCamStatus ? (
                  <div className={classes.process}>
                    <CircularProgress size={16} />
                  </div>
                ) : (
                  <Switch
                    color="primary"
                    size="small"
                    checked={detail.status !== 'disabled'}
                    onChange={this._onSwitchChange(detail.id, detail.status)}
                  />
                )}
              </Fragment>
            </div>
          </div>
        </Card>
      </div>
      // </ListItem>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  focusedCam: cameras.focusedCam,
  changingCamStatus: cameras.changingCamStatus,
})
export default connect(mapStateToProps, {
  focusOnCam: focusOnCam,
  showDeleteCamModal: showDeleteCamModal,
  // switchTab: switchTab,
  changeCamStatus,
  configCam: configCam,
  // getCamConnection: getCamConnection
})(withStyles(styles)(CameraItem))
