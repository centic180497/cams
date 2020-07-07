import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, Button, Switch, InputAdornment } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import {
  changeAddCameraParams,
  configCamParams,
  backStep
} from '../../actions/action_camera'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import TextInput from '../../components/TextInput'
import {
  CamModesControl,
  CamResolutionControl,
  QualityControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'

import isEmpty from 'lodash/isEmpty'
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    marginTop: 10,
    marginRight: 10,
  },
  actionButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  textField: {
    fontSize: '0.875rem',
  },
  inputAdornment: {
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
  },
  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(19px, 14px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '2.5px 0 2.5px 6px',
  },
  button: {
    marginRight: 10,
  },
})

const selectStyles = {
  menu: styles => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

class Param extends Component {
  handleBackStep = () => {
    this.props.backStep()
  }

  onChange = name => event => {
    this.props.changeAddCameraParams({ [name]: parseInt(event.target.value) })
  }
  changeSwitch = name => event => {
    this.props.changeAddCameraParams({ [name]: event.target.checked })
  }
  changeSelect = name => value => {
    if (name === 'quality') {
      this.props.changeAddCameraParams({ [name]: value.value })
    } else {
      const { height, width } = value.value
      this.props.changeAddCameraParams({ [name]: { height, width } })
    }
  }

  handleSubmit = event => {
    const {
      resolution,
      fps,
      fps_range,
      quality,
      rtsp_link, 
      snapshot_url
      // bitrate,
      // bitrate_range,
    } = this.props.addCamera

    this.props.configCamParams({
      // id,
      resolution,
      fps,
      fps_range,
      quality,
      rtsp_link, 
      snapshot_url,
      // bitrate,
      // bitrate_range,
    })
  }

  render() {
    const { classes, addCamera = {}, errors = {} } = this.props

    const resolution = {
      value: addCamera.resolution,
      label: addCamera.resolution.width + ' x ' + addCamera.resolution.height,
    }

    const resolutionOptions = addCamera.resolution_range.map(resolution => ({
      value: {
        width: parseInt(resolution.width),
        height: parseInt(resolution.height),
      },
      label: resolution.width + ' x ' + resolution.height,
    }))
    const quality = {
      value: addCamera.quality,
      label: addCamera.quality,
    }
    const qualityOptions = addCamera.quality_range
    return (
      <div className={classes.root}>
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.formGroup}>
              {/* <div className="form-group">
                <label className="control-label">Trạng thái</label>
                <Switch 
                  checked={addCamera.enabled} 
                  onChange={this.changeSwitch('enabled')} 
                  value="status" 
                  color="primary"
                />
              </div> */}
              <div className="form-group">
                <Select
                  classes={classes}
                  components={{
                    Control: CamResolutionControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  value={resolution}
                  options={resolutionOptions}
                  placeholder={false}
                  styles={selectStyles}
                  error={!isEmpty(errors.resolution)}
                  helperText={
                    !isEmpty(errors.resolution) ? errors.resolution : ''
                  }
                  onChange={this.changeSelect('resolution')}
                />
              </div>
              <div className="form-group">
                <Select
                  classes={classes}
                  components={{
                    Control: QualityControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  placeholder={false}
                  value={quality}
                  options={qualityOptions}
                  styles={selectStyles}
                  error={!isEmpty(errors.quality)}
                  helperText={!isEmpty(errors.quality) ? errors.quality : ''}
                  onChange={this.changeSelect('quality')}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="FPS"
                  fullWidth
                  
                  margin="none"
                  type="number"
                  variant="outlined"
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                    },
                  }}
                  InputProps={{
                    inputProps: {
                      className: classes.inputProps,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        {addCamera.fps_range.Min} - {addCamera.fps_range.Max}
                      </InputAdornment>
                    ),
                  }}
                  value={addCamera.fps}
                  onChange={this.onChange('fps')}
                  className={classes.textField}
                  error={!isEmpty(errors.fps)}
                  helperText={!isEmpty(errors.fps) ? errors.fps : ''}
                />
              </div>
              {/* <div className="form-group">
                <TextField
                  label="Bitrate (Kbps)"
                  fullWidth
                  margin="none"
                  type="number"
                  variant="outlined"
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                    },
                  }}
                  InputProps={{
                    inputProps: {
                      className: classes.inputProps,
                    },
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className={classes.inputAdornment}
                      >
                        {addCamera.bitrate_range.Min} -{' '}
                        {addCamera.bitrate_range.Max}
                      </InputAdornment>
                    ),
                  }}
                  value={addCamera.bitrate}
                  onChange={this.onChange('bitrate')}
                  className={classes.textField}
                  error={!isEmpty(errors.bitrate)}
                  helperText={!isEmpty(errors.bitrate) ? errors.bitrate : ''}
                />
              </div> */}
              <div className="form-group">
                <TextInput
                  label="Link RTSP"
                  fullWidth
                  type="text"
                  value={addCamera.rtsp_link}
                  onChange={this.onChange('rtsp_link')}
                />
                
              </div>
              <div className="form-group">
                <TextInput
                  label="Link snapshot"
                  type="text"
                  fullWidth
                  value={addCamera.snapshot_url}    
                  onChange={this.onChange('snapshot_url')}
                />
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={classes.actionButton}>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            onClick={this.handleBackStep}
          >
            Quay lại
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleSubmit}
          >
            Tiếp theo
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  addCamera: cameras.addCamera,
  errors: cameras.errors,
})

export default connect(
  mapStateToProps,
  {
    changeAddCameraParams,
    configCamParams,
    backStep,
  },
)(withStyles(styles)(Param))
