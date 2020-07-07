import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  InlineDatePicker,
  InlineTimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import DateFnsUtils from '@date-io/date-fns'
import viLocale from 'date-fns/locale/vi'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TextInput from '../../components/TextInput'
import {
  searchVehicles,
  clearVehicles,
} from '../../actions/action_searchVehicles'
import { Switch } from '@material-ui/core'

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: '10px 6px 6px 6px',
  },
  textField: {
    fontSize: '0.875rem',
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
    padding: '2.5px 14px',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  radio: {
    padding: 0,
    // marginRight: 0,
    // marginLeft: 0,
    marginBottom: 0,
  },
  formControlLabel: {
    marginLeft: 0,
  },
  checkBox: {
    padding: 0,
  },
})

class Search extends Component {
  constructor() {
    super()
    this.timeout = null
    this.interval = null
    this.intervalAutoUpdate = null
    this.state = {
      q: '',
      auto: false,
      real_time: true,
      start_day: new Date(),
      start_hour: new Date().setHours(0, 0, 0),
      end_day: new Date(),
      end_hour: new Date(),
      filter: 'plate_number',
    }
  }

  componentDidMount() {
    // this.autoUpdateVehicles()
    // this.autoUpdateTime()
    this.submitForm(this.state)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.searchString !== this.props.searchString) {
      this.setState({
        q: this.props.searchString,
      })
      // this.submitForm(this.state)
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout)
    if (this.interval) clearInterval(this.interval)
    if (this.intervalAutoUpdate) clearInterval(this.intervalAutoUpdate)
  }

  autoUpdateTime = () => {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      this.setState({
        // start_day: new Date(),
        // start_hour: new Date().setHours(0, 0, 0),
        end_day: new Date(),
        end_hour: new Date(),
      })
    }, 1000)
  }

  stopUpdateTime = () => {
    if (this.interval) clearInterval(this.interval)
  }

  autoUpdateVehicles = () => {
    this.intervalAutoUpdate = setInterval(() => {
      this.submitForm(this.state)
    }, 30000)
  }

  stopAutoUpdateVehicles = () => {
    if (this.intervalAutoUpdate) clearInterval(this.intervalAutoUpdate)
  }

  _onTextInputChange = async (event) => {
    event.persist()
    const TIMEOUT_INPUT = 500
    this.setState({
      [event.target.name]: event.target.value,
    })
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.submitForm(this.state)
    }, TIMEOUT_INPUT)
  }

  _onDatePickerChange = (name) => (date) => {
    const old_date = new Date(
      this.state[name].getFullYear(),
      this.state[name].getMonth(),
      this.state[name].getDate(),
    )
    const new_date = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    if (old_date.getTime() !== new_date.getTime()) {
      this.setState(
        {
          real_time: false,
          [name]: date,
        },
        () => this.submitForm(this.state),
      )
    }
  }

  _onTimePickerChange = (name) => (date) => {
    const old_hour = new Date(this.state[name]).setSeconds(0)
    const new_hour = new Date(date).setSeconds(0)
    if (old_hour !== new_hour) {
      this.setState(
        {
          real_time: false,
          [name]: date,
        },
        () => this.submitForm(this.state),
      )
    }
  }

  _onCheckBoxChange = (name) => async (event) => {
    this.setState({
      [name]: event.target.checked,
    })
  }

  _onRadioChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => this.submitForm(this.state),
    )
  }

  _onPickerOpen = () => {
    this.stopUpdateTime()
  }

  _onPickerClose = () => {
    if (this.state.real_time) {
      this.autoUpdateTime()
    }
  }

  _onSwitchChange = (name) => (event) => {
    this.setState({
      [name]: event.target.checked,
    }, () => {
      if (this.state.auto) {
        this.autoUpdateTime()
        this.autoUpdateVehicles()
      } else {
        this.stopUpdateTime()
        this.stopAutoUpdateVehicles()
      }
    })
    
  }

  updateVehicles = () => {
    this.setState(
      {
        end_day: new Date(),
        end_hour: new Date(),
      },
      () => this.submitForm(this.state),
    )
  }

  submitForm = (values) => {
    const { start_day, start_hour, end_day, end_hour, q, filter } = values
    const start_time = new Date(
      new Date(start_day).getFullYear(),
      new Date(start_day).getMonth(),
      new Date(start_day).getDate(),
      new Date(start_hour).getHours(),
      new Date(start_hour).getMinutes(),
    ).toString()
    const end_time = new Date(
      new Date(end_day).getFullYear(),
      new Date(end_day).getMonth(),
      new Date(end_day).getDate(),
      new Date(end_hour).getHours(),
      new Date(end_hour).getMinutes(),
    ).toString()
    this.props.clearVehicles()
    this.props.searchVehicles({
      string: q,
      page: 1,
      start_time: start_time,
      end_time: end_time,
      filter: filter,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <form autoComplete="off">
          <div className="form-group">
            <TextInput
              id="query_string"
              name="q"
              fullWidth
              type="search"
              label="Nhập biển số phương tiện"
              value={this.state.q}
              onChange={this._onTextInputChange}
              disabled={this.state.filter === 'no_plate_number'}
            />
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
            <div className="form-group">
              <InlineDatePicker
                label="Ngày bắt đầu"
                name="start_day"
                variant="outlined"
                format="dd/MM/yyyy"
                value={this.state.start_day}
                onChange={this._onDatePickerChange('start_day')}
                onOpen={this._onPickerOpen}
                onClose={this._onPickerClose}
                style={{
                  marginRight: 5,
                  width: 'calc(50% - 5px)',
                }}
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
                className={classes.textField}
              />
              <InlineTimePicker
                ampm={false}
                name="start_hour"
                label="Giờ bắt đầu"
                variant="outlined"
                value={this.state.start_hour}
                onChange={this._onTimePickerChange('start_hour')}
                onOpen={this._onPickerOpen}
                onClose={this._onPickerClose}
                style={{
                  marginLeft: 5,
                  width: 'calc(50% - 5px)',
                }}
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
                className={classes.textField}
              />
            </div>
            <div className="form-group">
              <InlineDatePicker
                label="Ngày kết thúc"
                name="end_day"
                variant="outlined"
                format="dd/MM/yyyy"
                value={this.state.end_day}
                onChange={this._onDatePickerChange('end_day')}
                onOpen={this._onPickerOpen}
                onClose={this._onPickerClose}
                style={{
                  marginRight: 5,
                  width: 'calc(50% - 5px)',
                }}
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
                className={classes.textField}
              />
              <InlineTimePicker
                ampm={false}
                name="end_hour"
                label="Giờ kết thúc"
                variant="outlined"
                value={this.state.end_hour}
                onChange={this._onTimePickerChange('end_hour')}
                onOpen={this._onPickerOpen}
                onClose={this._onPickerClose}
                style={{
                  marginLeft: 5,
                  width: 'calc(50% - 5px)',
                }}
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
                className={classes.textField}
              />
            </div>
          </MuiPickersUtilsProvider>

          <div>
            <RadioGroup
              className={classes.radioGroup}
              value={this.state.filter}
              onChange={this._onRadioChange}
              name="filter"
            >
              <FormControlLabel
                value="plate_number"
                control={<Radio className={classes.radio} color="primary" />}
                label="Biển số"
                className={classes.formControlLabel}
              />
              <FormControlLabel
                value="no_plate_number"
                control={<Radio className={classes.radio} color="primary" />}
                label="Phương tiện"
                className={classes.formControlLabel}
              />
            </RadioGroup>
          </div>
          <div style={{marginLeft: 8}}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.auto}
                  size="small"
                  onChange={this._onSwitchChange('auto')}
                  value="auto"
                  color="primary"
                />
              }
              label="Tự động cập nhật"
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ searchVehicles }) => ({
  searchString: searchVehicles.search.string,
})

export default connect(mapStateToProps, {
  searchVehicles,
  clearVehicles,
})(withStyles(styles)(Search))
