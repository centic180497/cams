import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, TextField } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  InlineDatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
} from 'material-ui-pickers'
import { Autocomplete } from '@material-ui/lab'
import { Scrollbars } from 'react-custom-scrollbars'
import viLocale from 'date-fns/locale/vi'
import Select from 'react-select'
import {
  CamList,
  ViolationType,
  VehicleType,
  StatusType,
  NoOptionsMessage,
} from 'components/Select/SelectControl'

const ViolationTypeOptions = [
  { value: 0, label: 'Tất cả' },
  { value: 1, label: 'Vượt đèn đỏ' },
  { value: 2, label: 'Lấn làn' },
]
const VehicleTypeOptions = [
  { value: 0, label: 'Tất cả' },
  { value: 1, label: 'Ô tô' },
  { value: 2, label: 'Xe máy' },
  { value: 3, label: 'Xe tải' },
  { value: 4, label: 'Xe khách' },
  { value: 5, label: 'Xe buýt' },
]
const StatusOptions = [
  { value: 0, label: 'Tất cả' },
  { value: 1, label: 'Chưa duyệt' },
  { value: 2, label: 'Đã duyệt' },
]

const selectStyles = {
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 10,
    }
  },
}

const styles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 16,
    flexGrow: 1,
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    padding: '8px 8px 0 8px',
  },
  formActions: {
    padding: '0 8px 8px',
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

class FilterForm extends Component {
  handlePickerChange = (name, date) => {
    let newDate
    if (date === null) {
      this.props.setFieldValue(name, null)
      return
    }

    if (name === 'endTime') {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        23,
        59,
        59,
      )
    } else {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }
    this.props.setFieldValue(name, newDate.toString())
  }

  handleSelectChange = (name, event, values, reason) => {
    this.props.setFieldValue(name, values)
  }

  render() {
    const { classes, values, cameraOptions = [], handleSubmit } = this.props
    return (
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%' }}>
            <div className={classes.formGroup}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <div className="form-group">
                  <DatePicker
                    fullWidth
                    label="Từ ngày"
                    name="startDay"
                    clearable
                    clearLabel="Xóa"
                    okLabel="Chọn"
                    cancelLabel="Hủy"
                    variant="outlined"
                    format="dd/MM/yyyy"
                    InputLabelProps={{
                      classes: {
                        root: classes.inputLabel,
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        className: classes.inputProps,
                      },
                    }}
                    value={values.startTime}
                    onChange={(date) =>
                      this.handlePickerChange('startTime', date)
                    }
                  />
                </div>
                <div className="form-group">
                  <DatePicker
                    fullWidth
                    label="Đến ngày"
                    name="endDay"
                    clearable
                    clearLabel="Xóa"
                    okLabel="Chọn"
                    cancelLabel="Hủy"
                    variant="outlined"
                    format="dd/MM/yyyy"
                    InputLabelProps={{
                      classes: {
                        root: classes.inputLabel,
                      },
                    }}
                    InputProps={{
                      inputProps: {
                        className: classes.inputProps,
                      },
                    }}
                    value={values.endTime}
                    onChange={(date) =>
                      this.handlePickerChange('endTime', date)
                    }
                  />
                </div>
              </MuiPickersUtilsProvider>
              <div className="form-group">
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  multiple
                  size="small"
                  options={cameraOptions}
                  filterSelectedOptions
                  getOptionLabel={(options) => options.label}
                  getOptionSelected={(option, value) => {
                    return _.isEqual(option, value)
                  }}
                  value={values.cameras}
                  renderInput={(params) => (
                    <TextField {...params} label="Camera" variant="outlined" />
                  )}
                  onChange={(event, value, reason) =>
                    this.handleSelectChange('cameras', event, value, reason)
                  }
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  disableClearable
                  // multiple
                  size="small"
                  options={VehicleTypeOptions}
                  getOptionLabel={(options) => options.label}
                  value={values.vehicleType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại phương tiện"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, value, reason) =>
                    this.handleSelectChange('vehicleType', event, value, reason)
                  }
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  disableClearable
                  // multiple
                  size="small"
                  options={ViolationTypeOptions}
                  getOptionLabel={(options) => options.label}
                  value={values.violationType}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại vi phạm"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, value, reason) =>
                    this.handleSelectChange(
                      'violationType',
                      event,
                      value,
                      reason,
                    )
                  }
                />
              </div>
              <div className="form-group">
                <Autocomplete
                  freeSolo
                  openOnFocus
                  blurOnSelect
                  disableClearable
                  // multiple
                  size="small"
                  options={StatusOptions}
                  getOptionLabel={(options) => options.label}
                  value={values.status}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Trạng thái"
                      variant="outlined"
                    />
                  )}
                  onChange={(event, value, reason) =>
                    this.handleSelectChange('status', event, value, reason)
                  }
                />
              </div>
            </div>
          </Scrollbars>
        </div>
        <div className={classes.formActions}>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Áp dụng
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ cameras }) => {
  const cameraOptions = cameras.cameras.map((cam) => ({
    value: cam.id,
    label: cam.name,
  }))
  return {
    cameraOptions,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(FilterForm))
