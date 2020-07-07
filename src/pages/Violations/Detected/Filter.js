import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button } from '@material-ui/core'
import _ from 'lodash'
import { Formik } from 'formik'

import { fetchAllCams } from 'actions/action_camera'
import { changeParamViolationFilter, filterViolations } from 'actions/action_violations'
import FilterForm from './FilterForm'

const styles = theme => ({
  root: {
    width: 300,
    // height: '100%',
    height: 500,
    maxHeight: 'calc(100vh - 70px)',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    paddingTop: 16,
    paddingLeft: 16,
    fontSize: 18,
    textTransform: 'uppercase',
  },
})

class Filter extends Component {
  componentDidMount() {
    this.props.fetchAllCams()
  }

  handleSubmit = values => {
    this.props.filterViolations({ filter: values, page: 1 })
  }

  render() {
    const { classes, cameraOptions, filter } = this.props
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>Lọc</Typography>
        <Formik
          enableReinitialize
          initialValues={{
            q: filter.q,
            startTime: filter.startTime,
            endTime: filter.endTime,
            cameras: filter.cameras,
            vehicleType: filter.vehicleType,
            violationType: filter.violationType,
            status: filter.status,
          }}
          onSubmit={values => this.handleSubmit(values)}
          render={props => <FilterForm {...props} />}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, violations }) => {
  const cameraOptions = cameras.cameras.map(cam => ({ value: cam.id, label: cam.name }))
  return {
    cameraOptions,
    filter: violations.filter,
  }
}
export default connect(
  mapStateToProps,
  {
    fetchAllCams,
    filterViolations,
    changeParamViolationFilter,
  },
)(withStyles(styles)(Filter))
