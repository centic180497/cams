import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TextField, Button, Switch, InputAdornment } from '@material-ui/core'
import { Formik} from 'formik'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'
import Select from 'react-select'
import {
  CamModesControl,
  CamResolutionControl,
  QualityControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'
import { getCamParams, editCamParams, fetchCamParams } from '../../actions/action_camera'
import Loading from '../../components/Loading';
import EditParamsForm from './EditParamsForm'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    marginTop: 20,
    marginRight: 10,
  },
  actionButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  textField: {
    fontSize: '0.875rem',
  },
  inputAdornment: {
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
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
  button: {
    marginRight: 10,
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

class EditParams extends Component {
  state = { 

  }

  componentDidMount() {
    const { focusedCam } = this.props
    // this.props.getCamParams(focusedCam)
    this.props.fetchCamParams(focusedCam)
  }

  onChange = name => event => {

  }

  changeSelect = name => value => {}

  handleSubmit = (values) => {
    const { focusedCam } = this.props
    const payload = {
      ...values,
      resolution: values.resolution.value,
      quality: values.quality.value,
    }
    this.props.editCamParams(focusedCam, payload)
  }

  render() {
    const { 
      classes,
      isFetching,
      editParamsData = {},
      currentParams = {},
      errors = {}
    } = this.props
    let resolution = {}, quality = {}
     
    if(_.has(currentParams, 'resolution')){
      resolution = {
        value: currentParams.resolution,
        label: currentParams.resolution.width + 'x' + currentParams.resolution.height
      }
    }
    if(_.has(currentParams, 'quality')){
      quality = {
        value: currentParams.quality,
        label: currentParams.quality,
      }
    }
    return (
      <div className={classes.root}>
        <div className={classes.formContent}>
          {isFetching ? <Loading /> : 
            <Formik
              enableReinitialize
              initialValues={{
                resolution,
                quality,
                fps: currentParams.fps,
                bitrate: currentParams.bitrate,
                rtsp_link: currentParams.rtsp_link,
                snapshot_url: currentParams.snapshot_url,
              }}
              onSubmit={values => this.handleSubmit(values)}
              render={(props) =>  <EditParamsForm {...props} />
              }
            />
          }
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({cameras}) => ({
  isFetching: cameras.isFetching,
  focusedCam: cameras.focusedCam,
  editParamsData: cameras.editCam.params,
  currentParams: cameras.currentCam.params,
  errors: cameras.errors
})

export default connect(mapStateToProps, {
  getCamParams: getCamParams,
  editCamParams: editCamParams,
  fetchCamParams
})(withStyles(styles)(EditParams))
