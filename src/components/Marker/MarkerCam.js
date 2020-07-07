import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import ClearOutlined from '@material-ui/icons/ClearOutlined'
import { 
  focusOnCam, 
  cancelFocusedCam,
  configCam,
  getCamConnection,
} from 'actions/action_camera'
import TooltipWrapper from 'components/TooltipWrapper'
import cx from 'classnames'
import './index.scss'
import Typography from '@material-ui/core/Typography'
import { Switch } from '@material-ui/core'

const styles = theme => ({
  popper: {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    transformStyle: 'preserve-3d',
    top: 0,
    left: '50%'
  },
  tooltip: {
    maxWidth: 300,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: '0 0 10px #333',
    fontSize: '0.725rem',

    borderRadius: '4px',
    padding: '4px 8px',
    left: '50%',
    margin: '8px 0'
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
      borderColor: 'transparent transparent #fff transparent'
    }
  },
  iconButton: {
    padding: 6
  },
  closeButton: {
    zIndex: 3,
    fontSize: 14,
    padding: 3,
    position: 'absolute',
    top: 11,
    right: 2
  },
  icon: {
    fontSize: 16
  },
  smallIcon: {
    fontSize: 14
  },
  switchBase: {
    height: 20
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // textAlign: 'center'
  }
})

class MarkerCam extends Component {

  state = {
    hover: false
  }

  handleClick = e => {
    e.stopPropagation()
    this.setState({
      hover: false
    })
    this.props.cancelFocusedCam()
  }

  _onMouseEnter = () => {
    this.setState({
      hover: true
    })
  }

  _onMouseLeave = () => {
    this.setState({
      hover: false
    })
  }

  _onMarkerClick = () => {
    const { lat, lng, id } = this.props.detail
    this.props.focusOnCam({
      center: { lat, lng },
      zoom: 15,
      id
    })
  }

  handleConfigsClick = (event) => {
    event.stopPropagation()
    const { id, lat, lng, name, ip } = this.props.detail
    this.props.configCam({
      center: { lat, lng },
      name, 
      ip,
      zoom: 15,
      id
    })
  }

  render() {
    const {
      detail = {},
      classes,
      // isEditingCam,
      // currentCamId,
      focusedCam,
      // onClick
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
            <div className={classes.tooltip}>
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
                {detail.ip}
              </Typography>
              {/* <Typography color="inherit" noWrap align="center">
                {detail.address}
              </Typography> */}
              {/* <span className={classes.arrow}/> */}
              {isFocused && (
                <Fragment>
                  <div className={classes.controls}>
                    <TooltipWrapper title="Cấu hình">
                      <IconButton
                        className={classes.iconButton}
                        onClick={this.handleConfigsClick}
                      >
                        <SettingsIcon className={classes.icon} />
                      </IconButton>
                    </TooltipWrapper>
                    <TooltipWrapper title="Xóa">
                      <IconButton className={classes.iconButton}>
                        <DeleteIcon className={classes.icon} />
                      </IconButton>
                    </TooltipWrapper>
                    <TooltipWrapper>
                      <Switch
                        color="primary"
                        classes={{
                          switchBase: classes.switchBase
                        }}
                      />
                    </TooltipWrapper>
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
  isEditingCam: map.isEditingCam
  // currentCamId: cameras.currentCam.id,
})
export default connect(
  mapStateToProps,
  {
    cancelFocusedCam: cancelFocusedCam,
    focusOnCam: focusOnCam,
    configCam: configCam,
    getCamConnection: getCamConnection,
  }
)(withStyles(styles, { withTheme: true })(MarkerCam))
