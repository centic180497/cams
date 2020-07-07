import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'
import Select from 'react-select'
import Creatable from 'react-select/lib/Creatable'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import TextInput from '../../components/TextInput'
import {
  ProvinceControl,
  DistrictControl,
  CommuneControl,
  GroupControl,
  NoOptionsMessage,
  Option,
} from '../../components/Select/SelectControl'
import { fetchDistricts, fetchCommunes } from '../../actions/action_political'

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
    marginTop: 5,
    padding: '10px',
  },
  actionButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  formHelperText: {
    margin: '8px 12px 0',
  },
  textField: {
    fontSize: '0.875rem',
    width: 'calc(50% - 5px)',
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

const filter = createFilterOptions()

class EditConnectForm extends Component {
  _onTextInputChange = (event) => {
    this.props.handleChange(event)
  }

  _onSelectChange = (name) => (value) => {
    this.props.setFieldValue(name, value, true)
    switch (name) {
      case 'province':
        this.props.setFieldValue('district', null, true)
        this.props.setFieldValue('commune', null, true)
        if (_.has(value, 'value')) {
          this.props.fetchDistricts(value.value)
        }
        break
      case 'district':
        this.props.setFieldValue('commune', null, true)
        if (_.has(value, 'value')) {
          this.props.fetchCommunes(value.value)
        }
        break
      default:
        break
    }
  }

  handleSelectChange = (name, event, value, reason) => {
    this.props.setFieldValue(name, value, true)
    switch (name) {
      case 'province':
        this.props.setFieldValue('district', null, true)
        this.props.setFieldValue('commune', null, true)
        if (_.has(value, 'value')) {
          this.props.fetchDistricts(value.value)
        }
        break
      case 'district':
        this.props.setFieldValue('commune', null, true)
        if (_.has(value, 'value')) {
          this.props.fetchCommunes(value.value)
        }
        break
      default:
        break
    }
  }

  render() {
    const {
      classes,
      values,
      errors = {},
      isProcessing,
      provinceOptions = [],
      districtOptions = [],
      communeOptions = [],
      groupOptions = [],
      handleSubmit,
    } = this.props
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.formGroup}>
              <div className="form-group">
                <TextInput
                  label="Tên camera"
                  name="name"
                  fullWidth
                  value={values.name}
                  onChange={this._onTextInputChange}
                  error={!_.isEmpty(errors.name)}
                  helperText={!_.isEmpty(errors.name) ? errors.name : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  disabled
                  label="Vĩ độ"
                  type="number"
                  style={{
                    marginRight: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  value={values.lat}
                  error={!_.isEmpty(errors.lat)}
                  helperText={!_.isEmpty(errors.lat) ? errors.lat : ''}
                />
                <TextInput
                  disabled
                  label="Kinh độ"
                  type="number"
                  style={{
                    marginLeft: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  value={values.lng}
                  error={!_.isEmpty(errors.lng)}
                  helperText={!_.isEmpty(errors.lng) ? errors.lng : ''}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  disableClearable
                  filterSelectedOptions
                  options={provinceOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tỉnh/Thành phố"
                      variant="outlined"
                    />
                  )}
                  value={values.province}
                  onChange={(event, value, reason) => {
                    this.handleSelectChange('province', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  disableClearable
                  filterSelectedOptions
                  options={districtOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quận/Huyện"
                      variant="outlined"
                    />
                  )}
                  value={values.district}
                  onChange={(event, value, reason) => {
                    this.handleSelectChange('district', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  disableClearable
                  filterSelectedOptions
                  options={communeOptions}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phường/Xã"
                      variant="outlined"
                    />
                  )}
                  value={values.commune}
                  onChange={(event, value, reason) => {
                    this.handleSelectChange('commune', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  multiple
                  filterSelectedOptions
                  options={groupOptions}
                  getOptionLabel={(options) => options.label}         
                  renderInput={(params) => (
                    <TextField {...params} label="Nhóm" variant="outlined" />
                  )}
                  value={values.group}
                  onChange={(event, value, reason) => {
                    let newValue = value.map(item => {
                      if(item.__isNew__){
                        item.label = item.value
                      }
                      return item
                    })
                    this.handleSelectChange('group', event, newValue, reason)
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)
                    if(params.inputValue !== '') {
                      filtered.push({
                        value: params.inputValue,
                        label: `Tạo mới "${params.inputValue}"`,
                        __isNew__: true
                      })
                    }
                    return filtered
                  }}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Địa chỉ IP"
                  name="ip"
                  onChange={this._onTextInputChange}
                  style={{
                    marginRight: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  value={values.ip}
                  error={!_.isEmpty(errors.ip)}
                  helperText={!_.isEmpty(errors.ip) ? errors.ip : ''}
                />
                <TextInput
                  label="Port"
                  name="port"
                  type="number"
                  onChange={this._onTextInputChange}
                  className={classes.textField}
                  style={{
                    marginLeft: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  value={values.port}
                  error={!_.isEmpty(errors.port)}
                  helperText={!_.isEmpty(errors.port) ? errors.port : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Tên đăng nhập"
                  name="cam_user"
                  fullWidth
                  onChange={this._onTextInputChange}
                  value={values.cam_user}
                  error={!_.isEmpty(errors.cam_user)}
                  helperText={
                    !_.isEmpty(errors.cam_user) ? errors.cam_user : ''
                  }
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Mật khẩu"
                  name="cam_pass"
                  fullWidth
                  onChange={this._onTextInputChange}
                  value={values.cam_pass}
                  error={!_.isEmpty(errors.cam_pass)}
                  helperText={
                    !_.isEmpty(errors.cam_pass) ? errors.cam_pass : ''
                  }
                />
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={classes.actionButton}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isProcessing}
          >
            Lưu
            {isProcessing && (
              <CircularProgress
                size={24}
                className={classes.process}
                color="primary"
              />
            )}
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ cameras, political }) => ({
  errors: cameras.errors,
  isProcessing: cameras.isProcessing,
  provinceOptions: political.provinces,
  districtOptions: political.districts,
  communeOptions: political.communes,
  groupOptions: political.groups,
})

export default connect(mapStateToProps, { fetchDistricts, fetchCommunes })(
  withStyles(styles)(EditConnectForm),
)
