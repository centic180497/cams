import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'

import { configCamParams } from '../../actions/action_camera'
import AddCamParamsForm from './AddCamParamsForm'
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: 10,
  },
  formContent: {
    flexGrow: 1,
  },
})

class AddCamParams extends Component {
  _onSubmit = values => {
    this.props.configCamParams({
      ...values,
      resolution: values.resolution.value,
      quality: values.quality.value
    })
  }

  render() {
    const { classes, addCam = {} } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.formContent}>
          <Formik
            enableReinitialize
            initialValues={{
              resolution: {
                value: addCam.resolution,
                label: addCam.resolution.width + 'x' + addCam.resolution.height
              },
              fps_range: addCam.fps_range,
              quality: { value: addCam.quality, label: addCam.quality },
              fps: addCam.fps,
              rtsp_link: addCam.rtsp_link,
              snapshot_url: addCam.snapshot_url,
            }}
            onSubmit={values => this._onSubmit(values)}
            render={props => <AddCamParamsForm {...props} />}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ cameras }) => ({
  addCam: cameras.addCamera,
})

export default connect(mapStateToProps, {
  configCamParams
})(withStyles(styles)(AddCamParams))
