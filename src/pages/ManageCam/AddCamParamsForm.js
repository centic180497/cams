import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import _ from 'lodash'
import Select from 'react-select'
import { Autocomplete } from '@material-ui/lab'

import TextInput from '../../components/TextInput'
import {
  CamModesControl,
  CamResolutionControl,
  QualityControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'

import { backStep } from '../../actions/action_camera'

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    marginTop: 20,
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
  process: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

const selectStyles = {
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

class AddCamParamsForm extends Component {
  handleBackStep = () => {
    this.props.backStep()
  }
  _onInputChange = (event) => {
    event.persist()
    this.props.handleChange(event)
  }
  _onSelectChange = (name) => (value) => {
    console.log(value)
    this.props.setFieldValue(name, value, false)
  }

  handleSelectChange = (name, event, value, reason) => {
    this.props.setFieldValue(name, value, false)
  }

  render() {
    const { classes, addCam = {}, values, errors, handleSubmit } = this.props
    const resolutionOptions = addCam.resolution_range.map((resolution) => ({
      value: {
        width: parseInt(resolution.width),
        height: parseInt(resolution.height),
      },
      label: resolution.width + ' x ' + resolution.height,
    }))
    const qualityOptions = addCam.quality_range
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.formGroup}>
              <div className="form-group">
                {/* <Select
                  classes={classes}
                  components={{
                    Control: CamResolutionControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  options={resolutionOptions}
                  placeholder={false}
                  onChange={this._onSelectChange('resolution')}
                  styles={selectStyles}
                  value={values.resolution}
                  error={!_.isEmpty(errors.resolution)}
                  helperText={
                    !_.isEmpty(errors.resolution) ? errors.resolution : ''
                  }
                /> */}
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  disableClearable
                  size="small"
                  options={resolutionOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Độ phân giải"
                      variant="outlined"
                    />
                  )}
                  value={values.resolution}
                  onChange={(event, value, reason) => {
                    this.handleSelectChange('resolution', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                {/* <Select
                  classes={classes}
                  components={{
                    Control: QualityControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  placeholder={false}
                  options={qualityOptions}
                  styles={selectStyles}
                  onChange={this._onSelectChange('quality')}
                  error={!_.isEmpty(errors.quality)}
                  value={values.quality}
                  helperText={!_.isEmpty(errors.quality) ? errors.quality : ''}
                /> */}
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  disableClearable
                  size="small"
                  options={qualityOptions}
                  getOptionLabel={(option) => option.label.toString()}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Chất lượng"
                      variant="outlined"
                    />
                  )}
                  value={values.quality}
                  onChange={(event, value, reason) => {
                    this.handleSelectChange('quality', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                <TextField
                  label="FPS"
                  name="fps"
                  fullWidth
                  variant="outlined"
                  margin="none"
                  type="number"
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
                        {addCam.fps_range.Min} - {addCam.fps_range.Max}
                      </InputAdornment>
                    ),
                  }}
                  value={values.fps}
                  className={classes.textField}
                  onChange={this._onInputChange}
                  error={!_.isEmpty(errors.fps)}
                  helperText={!_.isEmpty(errors.fps) ? errors.fps : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Link RTSP"
                  name="rtsp_link"
                  fullWidth
                  type="text"
                  onChange={this._onInputChange}
                  value={values.rtsp_link}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Link snapshot"
                  name="snapshot_url"
                  fullWidth
                  type="text"
                  onChange={this._onInputChange}
                  value={values.snapshot_url}
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
            type="submit"
            // onClick={this.handleSubmit}
          >
            Tiếp theo
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  addCam: cameras.addCamera,
})

export default connect(mapStateToProps, {
  backStep,
})(withStyles(styles)(AddCamParamsForm))
