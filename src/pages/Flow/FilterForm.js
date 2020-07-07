import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import {
  InlineDatePicker,
  MuiPickersUtilsProvider,
  DateTimePicker,
  InlineDateTimePicker,
} from 'material-ui-pickers'
import viLocale from 'date-fns/locale/vi'
import DateFnsUtils from '@date-io/date-fns'
import { fetchFlowChartData, changeChartParams } from 'actions/action_flow'
import Select from 'react-select'
import { UnitTimeType, NoOptionsMessage } from 'components/Select/SelectControl'
import moment from 'moment'
const styles = theme => ({
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
  form: {
    display: 'flex',
  },
  right: {
    marginLeft: 'auto',
    width: 120,
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

class FilterForm extends Component {
  handlePickerChange = (name, date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    )
    // this.props.setFieldValue(name, newDate)
    this.props.changeChartParams({ [name]: newDate })
  }

  handleClick = (event, type) => {
    const camId = this.props.match.params.camId
    if (type === 'day') {
      const startOfDay = new Date().setHours(0, 0, 0)
      console.log(moment().startOf('day'))
      this.props.fetchFlowChartData({
        camId,
        filter: {
          startTime: moment().startOf('day')._d,
          endTime: new Date(),
          // startTime: new Date('Sun Nov 17 2019 00:00:00 GMT+0700 (Indochina Time'),
          // endTime: new Date('Sun Nov 17 2019 23:59:59 GMT+0700 (Indochina Time')
        },
      })
    } else if (type === 'week') {
      this.props.fetchFlowChartData({
        camId,
        filter: {
          startTime: moment()
            .day(1)
            .set({ hour: 0, minute: 0, second: 0 })._d,
          endTime: new Date(),
        },
      })
    }
  }

  handleSelectChange = (name, values) => {
    console.log(name, values)

    this.props.changeChartParams({ [name]: values })
  }

  render() {
    const { classes, values, filter } = this.props
    const unitTimeOptions = [
      { value: '1d', label: 'Ngày' },
      { value: '1h', label: 'Giờ' },
      { value: '30m', label: '30 phút' },
      { value: '15m', label: '15 phút' },
      { value: '10m', label: '10 phút' },
      { value: '5m', label: '5 phút' },
      { value: '1m', label: '1 phút' },
    ]
    return (
      <form className={classes.form}>
        <div className={classes.left}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
            <InlineDateTimePicker
              name="startTime"
              label="Thời điểm"
              variant="outlined"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
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
              value={filter.startTime}
              onChange={date => this.handlePickerChange('startTime', date)}
            />
            {/* <InlineDateTimePicker
              name="endTime"
              label="Đến"
              variant="outlined"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
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
              onChange={date => this.handlePickerChange('endTime', date)}
            /> */}
          </MuiPickersUtilsProvider>
        </div>
        <div className={classes.right}>
          <Select
            placeholder={false}
            styles={selectStyles}
            classes={classes}
            components={{
              Control: UnitTimeType,
              NoOptionsMessage: NoOptionsMessage,
            }}
            options={unitTimeOptions}
            value={filter.unit}
            // value={values.unit}
            onChange={values => this.handleSelectChange('unit', values)}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ flow }) => ({
  filter: flow.chart,
})

export default withRouter(
  connect(mapStateToProps, { fetchFlowChartData, changeChartParams })(
    withStyles(styles)(FilterForm),
  ),
)
