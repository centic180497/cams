import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import FilterForm from './FilterForm'
import {
  MuiPickersUtilsProvider,
  InlineDateTimePicker,
} from 'material-ui-pickers'
import Select from 'react-select'
import viLocale from 'date-fns/locale/vi'
import DateFnsUtils from '@date-io/date-fns'
import { changeChartParams, fetchFlowChartData } from 'actions/action_flow'
import { UnitTimeType, NoOptionsMessage } from 'components/Select/SelectControl'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'

const styles = (theme) => ({
  root: {
    padding: 16,
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
  form: {
    display: 'flex',
  },
  right: {
    marginLeft: 'auto',
    width: 120,
    marginRight: 30
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
class Filter extends Component {
  componentDidMount() {
    // const { filter, match } = this.props
    // this.handleFormSubmit({ camId: match.params.camId, filter })
  }

  handleFormSubmit = (values) => {
    // console.log(values)
  }

  handleSelectChange = (name, event, values, reason) => {
    this.props.changeChartParams({ [name]: values })
    this.props.fetchFlowChartData({ camId: this.props.match.params.camId })
  }

  handlePickerChange = (name, date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    )
    this.props.changeChartParams({ [name]: newDate })
    this.props.fetchFlowChartData({ camId: this.props.match.params.camId })
  }

  render() {
    const { classes, filter } = this.props
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
      <div className={classes.root}>
        {/* <Formik
          enableReinitialize
          initialValues={{
            startTime: filter.startTime,
            unit: filter.unit
          }}
          onSubmit={values => this.handleFormSubmit(values)}
          render={props => <FilterForm {...props} />}
        /> */}
        <div className={classes.form}>
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
                onChange={(date) => this.handlePickerChange('startTime', date)}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={classes.right}>
            <Autocomplete
            open
              openOnFocus
              blurOnSelect
              disableClearable
              size="small"
              options={unitTimeOptions}
              getOptionLabel={(option) => option.label}
              value={filter.unit}
              renderInput={(params) => (
                <TextField {...params} label="Đợn vị" variant="outlined" />
              )}
              onChange={(event, value, reason) =>
                this.handleSelectChange('unit', event, value, reason)
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ flow }) => ({
  filter: flow.chart,
})

export default withRouter(
  connect(mapStateToProps, { changeChartParams, fetchFlowChartData })(
    withStyles(styles)(Filter),
  ),
)
