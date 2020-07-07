import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { Formik } from 'formik'
import FilterForm from './FilterForm'
import { fetchAllCams } from 'actions/action_camera'
import { filterRecordVideos } from 'actions/action_record_videos'

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
    this.props.filterRecordVideos({filter: values, page: 1})
  }

  render() {
    const { classes, filter } = this.props
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>Lọc</Typography>
        <Formik
          enableReinitialize
          initialValues={{
            startTime: filter.startTime,
            endTime: filter.endTime,
            cameras: filter.cameras,
          }}
          onSubmit={values => this.handleSubmit(values)}
          render={props => <FilterForm {...props} />}
        />
      </div>
    )
  }
}
const mapStateToProps = ({ recordVideos }) => {
  return {
    filter: recordVideos.filter,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchAllCams,
    filterRecordVideos
  },
)(withStyles(styles)(Filter))
