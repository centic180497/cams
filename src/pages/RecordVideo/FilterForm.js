import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns'
import {
  DateTimePicker,
  InlineDateTimePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import { Scrollbars } from 'react-custom-scrollbars'
import viLocale from 'date-fns/locale/vi'
import Select from 'react-select'
import { Delete } from '@material-ui/icons'

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
    if (date) {
      newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
      ).toString()
    } else {
      newDate = null
    }

    // const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(),date.getMinutes())
    // if (name === 'endTime') {
    //   newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
    // } else {
    //   newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),  date.getHours(),date.getMinutes())
    // }
    this.props.setFieldValue(name, newDate)
  }

  handleSelectChange = (name, event, values, reason) => {
    this.props.setFieldValue(name, values)
  }

  render() {
    const { classes, values, handleSubmit, cameraOptions = [] } = this.props
    return (
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%' }}>
            <div className={classes.formGroup}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <div className="form-group">
                  <DateTimePicker
                    fullWidth
                    label="Từ ngày"
                    ampm={false}
                    // disableFuture
                    clearable
                    clearLabel="Xóa"
                    okLabel="Chọn"
                    cancelLabel="Hủy"
                    name="startDay"
                    variant="outlined"
                    format="dd/MM/yyyy HH:mm"
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
                  <DateTimePicker
                    fullWidth
                    label="Đến ngày"
                    ampm={false}
                    // disableFuture
                    clearable
                    clearLabel="Xóa"
                    okLabel="Chọn"
                    cancelLabel="Hủy"
                    name="endDay"
                    variant="outlined"
                    format="dd/MM/yyyy HH:mm"
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
                  filterSelectedOptions
                  options={cameraOptions}
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
