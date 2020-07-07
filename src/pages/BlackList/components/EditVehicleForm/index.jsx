import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import TextInput from 'components/TextInput'
import { closeModal } from 'actions/action_modal'

import styles from './styles'
import _ from 'lodash'

class EditVehicleForm extends Component {
  handleClose = () => {
    this.props.closeModal()
  }

  handleInputChange = event => {
    event.persist()
    this.props.handleChange(event)
  }

  render() {
    const { classes, isProcessing, values, handleSubmit, errors } = this.props
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formContent}>
          <div className={classes.formGroup}>
            <TextInput
              name="plate"
              fullWidth
              label="Biển số phương tiện"
              value={values.plate || ''}
              onChange={this.handleInputChange}
              error={!_.isEmpty(errors.plate)}
              helperText={!_.isEmpty(errors.plate) ? errors.plate : null}
            />
          </div>
          <div className={classes.formGroup}>
            <TextInput
              name="desc"
              fullWidth
              label="Mô tả"
              value={values.desc || ''}
              onChange={this.handleInputChange}
              error={!_.isEmpty(errors.desc)}
              helperText={!_.isEmpty(errors.desc) ? errors.desc : null}
            />
          </div>
        </div>
        <div className={classes.actionsButton}>
          <Button
            variant="contained"
            onClick={this.handleClose}
            className={classes.button}
          >
            Hủy
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <CircularProgress size={18} className={classes.progress} />
            ) : (
              'Lưu'
            )}
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({blackList}) => ({
  isProcessing: blackList.currentVehicle.api.editing,
  errors: blackList.currentVehicle.api.errors
})

export default connect(
  mapStateToProps,
  { closeModal },
)(withStyles(styles)(EditVehicleForm))
