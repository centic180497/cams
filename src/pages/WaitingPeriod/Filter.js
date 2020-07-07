import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  MuiPickersUtilsProvider,
  InlineDateTimePicker,
} from 'material-ui-pickers'
import Select from 'react-select'
import viLocale from 'date-fns/locale/vi'
import DateFnsUtils from '@date-io/date-fns'
import {
  ChartDataViaType,
  NoOptionsMessage,
} from 'components/Select/SelectControl'

import { filterLightPeriodChartData } from 'actions/action_lightPeriodChart'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'
const styles = themes => ({
  root: {
    display: 'flex',
    paddingTop: 16,
    paddingLeft: 16,
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
    width: 120,
    fontSize: '0.875rem',
    padding: '2.5px 0 2.5px 6px',
  },
  legend: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  rect: {
    width: 20,
    height: 20,
    marginRight: 4,
    borderRadius: 4,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 24,
  },
  hnt: {
    background: '#98abc5',
  },
  hht: {
    background: '#8a89a6',
  },
  redLight: {
    background: '#b71c1c',
  },
  yellowLight: {
    background: '#f9a825',
  },
  greenLight: {
    background: '#2e7d32',
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

class Filter extends Component {
  handlePickerChange = (date, type) => {
    this.props.filterLightPeriodChartData({
      [type]: date.toString(),
    })
  }

  handleSelectChange = (date, type) => {}

  render() {
    const { classes, filter } = this.props

    const options = [
      { value: 'camera', label: 'Camera' },
      { value: 'phase', label: 'Tuyến' },
    ]

    return (
      <div className={classes.root}>
        <div className={classes.form}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
            <InlineDateTimePicker
              name="time"
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
              value={filter.time}
              onChange={date => this.handlePickerChange(date, 'time')}
            />
          </MuiPickersUtilsProvider>
        </div>
        {/* <div>
          <Select
            placeholder={false}
            styles={selectStyles}
            classes={classes}
            components={{
              Control: ChartDataViaType,
              NoOptionsMessage: NoOptionsMessage,
            }}
            options={options}
            value={filter.via}
            onChange={values => this.handleSelectChange(values, 'via')}
          />
        </div> */}
        <div className={classes.legend}>
          <div className={classes.row}>
            <div className={classNames(classes.rect, classes.hnt)} />
            <Typography>Hà Huy Tập</Typography>
          </div>
          <div className={classes.row}>
            <div className={classNames(classes.rect, classes.hht)} />
            <Typography>Huỳnh Ngọc Huệ</Typography>
          </div>
          {/* <div className={classes.row}>
            <div className={classNames(classes.rect, classes.redLight)} />
            <Typography>Đèn đỏ</Typography>
          </div>
          <div className={classes.row}>
            <div className={classNames(classes.rect, classes.yellowLight)} />
            <Typography>Đèn vàng</Typography>
          </div>
          <div className={classes.row}>
            <div className={classNames(classes.rect, classes.greenLight)} />
            <Typography>Đèn xanh</Typography>
          </div> */}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ lightPeriod }) => ({
  filter: lightPeriod.filter,
})

export default connect(mapStateToProps, { filterLightPeriodChartData })(
  withStyles(styles)(Filter),
)
