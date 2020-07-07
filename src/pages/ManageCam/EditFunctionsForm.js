import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import EditFunctionRecord from './EditFunctionRecord'
import EditFunctionSurveillance from './EditFunctionSurveillance'
import EditFunctionStream from './EditFunctionStream'
import EditFunctionALPR from './EditFunctionALPR'

const styles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formContent: {
    flexGrow: 1,
  },
  formGroup: {
    padding: '5px 10px',
    marginTop: 5,
    // marginRight: 10,
  },
  actionsButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  process: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

class EditFunctionsForm extends Component {
  render() {
    const { classes, isProcessing, dirty, ...otherProps } = this.props
    return (
      <form className={classes.form} onSubmit={this.props.handleSubmit}>
        <div className={classes.formContent}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.formGroup}>
              <EditFunctionRecord {...otherProps} />
              <EditFunctionSurveillance {...otherProps} />
              <EditFunctionStream {...otherProps} />
              <EditFunctionALPR {...otherProps} />
            </div>
          </Scrollbars>
        </div>
        <div className={classes.actionsButton}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isProcessing || !dirty}
            // onClick={this.handleSubmit}
          >
            Lưu
            {isProcessing && (
              <CircularProgress
                size={24}
                className={classes.process}
                color="primary"
              />
            )}
          </Button>
        </div>
      </form>
    )
  }
}
const mapStateToProps = ({ cameras }) => ({
  isProcessing: cameras.isProcessing,
  errors: cameras.errors,
})
export default connect(mapStateToProps)(withStyles(styles)(EditFunctionsForm))
