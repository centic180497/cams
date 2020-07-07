import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormHelperText from '@material-ui/core/FormHelperText'
import { TextField, FormControl } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { createFilterOptions } from '@material-ui/lab/Autocomplete'
import Select from 'react-select'
import Creatable from 'react-select/lib/Creatable'
import isEmpty from 'lodash/isEmpty'

import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import TextInput from '../../components/TextInput'
import {
  changeAddCameraParams,
  // connectCamera,
  connectToCam,
} from '../../actions/action_camera'
import { toggleAddCamMap } from '../../actions/action_map'
import { getDataBeforeConnect } from '../../actions/action_manageCam'
import { showLoadingModal } from '../../actions/action_modal'
import { getAllProvinces } from '../../actions/action_political'
import {
  ProvinceControl,
  DistrictControl,
  CommuneControl,
  GroupControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'

const styles = (theme) => ({
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

class Connect extends Component {
  state = {
    value: '',
  }
  componentDidMount() {
    this.props.getDataBeforeConnect()
    // this.props.getAllProvinces()
    this.props.toggleAddCamMap()
  }
  componentWillUnmount() {
    this.props.toggleAddCamMap()
  }
  onChange = (name) => (event) => {
    this.props.changeAddCameraParams({ [name]: event.target.value })
  }
  changeSelect = (name) => (value) => {
    console.log(value)
    this.props.changeAddCameraParams({ [name]: value })
    // if(!isEmpty(value)){
    // }
  }

  handleChangeSelect = (name, event, value, reason) => {
    this.props.changeAddCameraParams({ [name]: value })
  }

  handleSubmit = (e) => {
    // this.props.showLoadingModal("Đang kết nối tới camera")
    const {
      // id,
      name,
      lat,
      lng,
      province,
      district,
      commune,
      group,
      ip,
      port,
      cam_user,
      cam_pass,
    } = this.props.addCamera
    this.props.connectToCam({
      // id,
      name,
      lat,
      lng,
      province,
      district,
      commune,
      group,
      ip,
      port,
      cam_user,
      cam_pass,
    })
  }
  render() {
    const {
      classes,
      addCamera,
      errors = {},
      provinceOptions = [],
      districtOptions = [],
      communeOptions = [],
      groupOptions = [],
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.formGroup}>
              <div className="form-group">
                <TextInput
                  label="Tên camera"
                  error={!isEmpty(errors.name)}
                  fullWidth
                  value={addCamera.name}
                  onChange={this.onChange('name')}
                  helperText={!isEmpty(errors.name) ? errors.name : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  disabled
                  label="Vĩ độ"
                  type="number"
                  value={addCamera.lat}
                  style={{
                    marginRight: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  error={!isEmpty(errors.lat)}
                  helperText={!isEmpty(errors.lat) ? errors.lat : ''}
                />
                <TextInput
                  disabled
                  label="Kinh độ"
                  type="number"
                  value={addCamera.lng}
                  style={{
                    marginLeft: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  error={!isEmpty(errors.lng)}
                  helperText={!isEmpty(errors.lng) ? errors.lng : ''}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  filterSelectedOptions
                  noOptionsText="Không có lựa chọn"
                  options={provinceOptions}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tỉnh/Thành phố"
                      variant="outlined"
                      error={!isEmpty(errors.province)}
                      helperText={
                        !isEmpty(errors.province) ? errors.province : ''
                      }
                    />
                  )}
                  value={addCamera.province}
                  onChange={(event, value, reason) =>
                    this.handleChangeSelect('province', event, value, reason)
                  }
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  filterSelectedOptions
                  noOptionsText="Không có lựa chọn"
                  options={districtOptions}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quận/Huyện"
                      variant="outlined"
                      error={!isEmpty(errors.district)}
                      helperText={
                        !isEmpty(errors.district) ? errors.district : ''
                      }
                    />
                  )}
                  value={addCamera.district}
                  onChange={(event, value, reason) => {
                    this.handleChangeSelect('district', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  openOnFocus
                  blurOnSelect
                  size="small"
                  filterSelectedOptions
                  noOptionsText="Không có lựa chọn"
                  options={communeOptions}
                  getOptionLabel={(options) => options.label}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Phường xã"
                      variant="outlined"
                      error={!isEmpty(errors.commune)}
                      helperText={
                        !isEmpty(errors.commune) ? errors.commune : ''
                      }
                    />
                  )}
                  value={addCamera.commune}
                  onChange={(event, value, reason) => {
                    this.handleChangeSelect('commune', event, value, reason)
                  }}
                />
              </div>
              <div className="form-group">
                {/* <Creatable
                  classes={classes}
                  components={{
                    Control: GroupControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  isMulti
                  formatCreateLabel={inputValue => `Tạo mới "${inputValue}"`}
                  placeholder={false}
                  options={groupOptions}
                  styles={selectStyles}
                  onChange={this.changeSelect('group')}
                  value={addCamera.group}
                  error={!isEmpty(errors.group)}
                  helperText={!isEmpty(errors.group) ? errors.group : ''}
                /> */}
                {/* <Select
                  classes={classes}
                  components={{
                    Control: GroupControl,
                    NoOptionsMessage: NoOptionsMessage,
                  }}
                  placeholder={false}
                  options={groupOptions}
                  styles={selectStyles}
                  onChange={this.changeSelect('group')}
                  value={addCamera.group}
                  error={!isEmpty(errors.group)}
                  helperText={!isEmpty(errors.group) ? errors.group : ''}
                /> */}
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
                  value={addCamera.group}
                  onChange={(event, value, reason) => {
                    let newValue = value.map((item) => {
                      if (item.__isNew__) {
                        item.label = item.value
                      }
                      return item
                    })
                    this.handleChangeSelect('group', event, newValue, reason)
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params)
                    if (params.inputValue !== '') {
                      filtered.push({
                        value: params.inputValue,
                        label: `Tạo mới "${params.inputValue}"`,
                        __isNew__: true,
                      })
                    }
                    return filtered
                  }}
                />
                {!isEmpty(errors.group) && (
                  <FormHelperText
                    error={true}
                    className={classes.formHelperText}
                  >
                    {!isEmpty(errors.group) ? errors.group : ''}
                  </FormHelperText>
                )}
              </div>
              <div className="form-group">
                <TextInput
                  label="Địa chỉ IP"
                  value={addCamera.ip}
                  onChange={this.onChange('ip')}
                  style={{
                    marginRight: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  error={!isEmpty(errors.ip)}
                  helperText={!isEmpty(errors.ip) ? errors.ip : ''}
                />
                <TextInput
                  label="Port"
                  type="number"
                  value={addCamera.port}
                  onChange={this.onChange('port')}
                  className={classes.textField}
                  style={{
                    marginLeft: 5,
                    width: 'calc(50% - 5px)',
                  }}
                  error={!isEmpty(errors.port)}
                  helperText={!isEmpty(errors.port) ? errors.port : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Tên đăng nhập"
                  fullWidth
                  value={addCamera.cam_user}
                  onChange={this.onChange('cam_user')}
                  error={!isEmpty(errors.cam_user)}
                  helperText={!isEmpty(errors.cam_user) ? errors.cam_user : ''}
                />
              </div>
              <div className="form-group">
                <TextInput
                  label="Mật khẩu"
                  type="password"
                  fullWidth
                  value={addCamera.cam_pass}
                  onChange={this.onChange('cam_pass')}
                  error={!isEmpty(errors.cam_pass)}
                  helperText={!isEmpty(errors.cam_pass) ? errors.cam_pass : ''}
                />
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={classes.actionButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            TIẾP THEO
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, political }) => ({
  addCamera: cameras.addCamera,
  errors: cameras.errors,
  provinceOptions: political.provinces,
  districtOptions: political.districts,
  communeOptions: political.communes,
  groupOptions: political.groups,
})
export default connect(mapStateToProps, {
  getAllProvinces,
  changeAddCameraParams,
  connectToCam,
  showLoadingModal,
  getDataBeforeConnect,
  toggleAddCamMap,
})(withStyles(styles)(Connect))
