import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Scrollbars } from 'react-custom-scrollbars'
import { Formik } from 'formik'
import omit from 'lodash/omit'

import { configFunctions, fetchCamFunctions, editCamFunctions } from '../../actions/action_camera'
import Enabled from './Enabled'
import Record from './Record'
import Surveillance from './Surveillance'
import Stream from './Stream'
import ALPR from './ALPR'
import Loading from '../../components/Loading'
import EditFunctionsForm from './EditFunctionsForm'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    marginTop: 10,
    marginRight: 10,
  },
  actionButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  panelSummary: {
    paddingLeft: 0,
  },
  button: {
    marginRight: 10,
  },
})

class EditFunctions extends Component {
  componentDidMount() {
    const { focusedCam } = this.props
    this.props.fetchCamFunctions(focusedCam)
  }
  changeSwitch = name => event => {
    event.stopPropagation()
  }

  handleSubmit = values => {
    const { focusedCam } = this.props
    this.props.editCamFunctions(focusedCam, values)
  }

  render() {
    const { 
      classes,
      isFetching,
      functions
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.formContent}>
          {isFetching ? (
            <Loading />
          ) : (
            <Formik
              enableReinitialize
              initialValues={{...functions}}
              onSubmit={values => this.handleSubmit(values)}
              render={props => <EditFunctionsForm {...props} />}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  isFetching: cameras.isFetching,
  focusedCam: cameras.focusedCam,
  functions: cameras.currentCam.functions,
})

export default connect(
  mapStateToProps,
  {
    fetchCamFunctions,
    editCamFunctions
    // backStep: backStep,
    // configFunctions: configFunctions
  },
)(withStyles(styles)(EditFunctions))
