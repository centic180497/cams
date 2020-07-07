import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Formik, withFormik } from 'formik'

import SearchForm from './SearchForm'
import {
  searchVehicles,
  clearVehicles,
} from '../../actions/action_searchVehicles'

const styles = theme => ({
  root: {
    width: '100%',
    padding: '10px 6px 6px 6px',
  },
  heading: {},
})


class Search extends Component {
  state = {
    q: '',
    real_time: true,
    start_day: new Date(),
    start_hour: new Date().setHours(0, 0, 0),
    end_day: new Date(),
    end_hour: new Date(),
    filter: 'plate_number',
  }
  componentDidMount() {
    console.log('mounted')
    this.updateTime()
    const values = {
      q: '',
      start_day: new Date(),
      start_hour: new Date().setHours(0, 0, 0),
      end_day: new Date(),
      end_hour: new Date(),
      filter: 'plate_number',
    }
    this._onSubmit(values)
  }

  componentWillUnmount() {
    this.stopUpdateTime()
    // clearInterval(this.intervalUpdateTime)
  }

  updateTime = () => {
    console.log('update time')
    if (this.interval) {
      clearInterval(this.interval)
    }

    this.interval = setInterval(() => {
      this.setState({
        start_day: new Date(),
        start_hour: new Date().setHours(0, 0, 0),
        end_day: new Date(),
        end_hour: new Date(),
      })
    }, 1000)
  }

  stopUpdateTime = () => {
    if(this.interval){
      console.log('stop update time')
      clearInterval(this.interval)
      this.interval = null
    }
  }

  // enableAutoUpdate = () => {
  //   this.setState({
  //     auto: true
  //   })
  // }

  // disableAutoUpdate = () => {
  //   this.setState({
  //     auto: false
  //   })
  // }

  enableRealTime = () => {
    this.updateTime()
    this.setState({
      real_time: true,
    })
  }

  disableRealTime = () => {
    console.log('terminated realtime')
    this.setState({
      real_time: false,
    })
    if(this.interval){
      this.stopUpdateTime()
    }
  }

  _onDatePickerChange = (name, date) => {

  }

  _onTimePickerChange = (name, date) => {
    console.log(date)
    this.setState({
      real_time: false,
      [name]: new Date(date)
    })
  }

  _onFilterChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  } 

  _onRealTimeChange = (event) => {
    this.setState({
      real_time: event.target.checked
    })
  }

  _onSubmit = async values => {
    console.log(values)
    const { start_day, start_hour, end_day, end_hour, filter } = values
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
    await this.props.clearVehicles()
    this.props.searchVehicles({
      string: values.q,
      page: 1,
      start_time: start_time,
      end_time: end_time,
      filter: values.filter,
    })
  }

  render() {
    console.log('render')
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Formik
          enableReinitialize
          initialValues={{
            ...this.state,
          }}
          onSubmit={values => this._onSubmit(values)}
          render={props => (
            <SearchForm
              {...props}
              real_time={this.state.real_time}
              enableRealTime={this.enableRealTime}
              disableRealTime={this.disableRealTime}
              stopUpdateTime={this.stopUpdateTime}
              updateTime={this.updateTime}
              _onFilterChange={this._onFilterChange}
              _onRealTimeChange={this._onRealTimeChange}
              _onTimePickerChange={this._onTimePickerChange}
              _onDatePickerChange={this._onDatePickerChange}
            />
          )}
        />
      </div>
    )
  }
}

export default connect(
  null,
  {
    searchVehicles,
    clearVehicles,
  },
)(withStyles(styles)(Search))
