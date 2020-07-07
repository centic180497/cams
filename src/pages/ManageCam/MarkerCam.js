import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Tooltip } from '@material-ui/core'

import {
  focusOnCam,
  cancelFocusedCam,
  configCam,
  getCamConnection,
  changeCamStatus,
} from 'actions/action_camera'
import TooltipWrapper from '../../components/TooltipWrapper'
import cx from 'classnames'
import './marker.scss'
import Typography from '@material-ui/core/Typography'
import { Switch } from '@material-ui/core'
import { showDeleteCamModal } from '../../actions/action_modal'

const styles = theme => ({
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%',
  },
  tooltip: {
    maxWidth: 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',

    borderRadius: '4px',
    // paddingTop: 
    padding: '4px 8px',
    left: '50%',
    margin: '8px 0',
  },
  arrow: {
    bottom: 0,
    width: '3rem',
    height: '1rem',
    position: 'absolute',
    '&::before': {
      width: 0,
      height: 0,
      margin: 'auto',
      content: '',
      display: 'block',
      borderStyle: 'solid',
      borderWidth: '0 1em 1em 1em',
      borderColor: 'transparent transparent #fff transparent',
    },
  },
  iconButton: {
    padding: 4,
  },
  closeButton: {
    zIndex: 3,
    fontSize: 14,
    padding: 3,
    position: 'absolute',
    top: 11,
    right: 2,
  },
  icon: {
    fontSize: 20,
  },
  smallIcon: {
    fontSize: 14,
  },
  switchBase: {
    height: 20,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center'
  },
  process: {
    padding: '0 23px',
    width: 62,
  },
})

class MarkerCam extends Component {
  state = {
    hover: false,
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState({
      hover: false,
    })
    this.props.cancelFocusedCam()
  }

  _onMouseEnter = () => {
    this.setState({
      hover: true,
    })
  }
  _onMouseLeave = () => {
    this.setState({
      hover: false,
    })
  }

  _onMarkerClick = () => {
    const { lat, lng, id } = this.props.detail
    this.props.focusOnCam({
      center: { lat, lng },
      zoom: 15,
      id,
    })
  }

  handleConfigsClick = event => {
    event.stopPropagation()
    const { id, lat, lng, name, ip } = this.props.detail
    this.props.configCam({
      center: { lat, lng },
      name,
      ip,
      zoom: 15,
      id,
    })
  }
  handleDelete = event => {
    event.stopPropagation()
    this.props.showDeleteCamModal(this.props.detail)
  }
  _onSwitchChange = (id, status) => e => {
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
  render() {
    const {
      detail = {},
      classes,
      // isEditingCam,
      // currentCamId,
      focusedCam,
      // onClick,
      changingCamStatus,
    } = this.props
    const isFocused = focusedCam === detail.id
    const { hover } = this.state
    // const isEditing = isEditingCam === currentCamId
    const markerStyles = cx('marker-instance', {
      'camera-normal': detail.status === 'enabled',
      'camera-disabled': detail.status === 'disabled',
      'marker-hover': hover,
      'marker-focused': isFocused,
      // 'marker-editing': detail.id === currentCamId
    })
    return (
      <div
        className={markerStyles}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        onClick={this._onMarkerClick}
      >
        {(hover || isFocused) && (
          <div className={classes.popper}>
            <div className={classes.tooltip} onClick={e => e.stopPropagation()}>
              {isFocused && (
                <IconButton
                  className={classes.closeButton}
                  onClick={this.handleClick}
                >
                  <ClearOutlined className={classes.smallIcon} />
                </IconButton>
              )}
              <Typography color="inherit" noWrap align="center">
                {detail.name}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography>
              {/* <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography> */}
              {/* <span className={classes.arrow}/> */}
              {isFocused && (
                <Fragment>
                  <div className={classes.controls}>
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
                        onClick={this.handleDelete}
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
                          onChange={this._onSwitchChange(
                            detail.id,
                            detail.status,
                          )}
                        />
                      )}
                    
                  </div>
                </Fragment>
              )}
              <span className="arrow" />
            </div>
          </div>
        )}
        {/* {isEditing && (
          <div className={classes.popper}>
            <div className={classes.tooltip}>
              <Typography color="inherit" noWrap align="center">
                {detail.name}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {detail.ip}
              </Typography>
              <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography>
              <span className="arrow" />
            </div>
          </div>
        )} */}
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, map }) => ({
  focusedCam: cameras.focusedCam,
  editingCam: cameras.editingCam,
  isEditingCam: map.isEditingCam,
  changingCamStatus: cameras.changingCamStatus,
  // currentCamId: cameras.currentCam.id,
})
export default connect(
  mapStateToProps,
  {
    cancelFocusedCam: cancelFocusedCam,
    focusOnCam: focusOnCam,
    configCam: configCam,
    getCamConnection: getCamConnection,
    showDeleteCamModal,
    changeCamStatus,
  },
)(withStyles(styles, { withTheme: true })(MarkerCam))
