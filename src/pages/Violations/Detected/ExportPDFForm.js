import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Button, CircularProgress } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  InlineDatePicker,
  InlineDateTimePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
import { Scrollbars } from 'react-custom-scrollbars'
import viLocale from 'date-fns/locale/vi'
import TextInput from 'components/TextInput'
import { closeModal } from 'actions/action_modal'

const styles = theme => ({
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
  actionsButton: {
    flexGorw: 0,
    marginTop: 'auto',
    textAlign: 'right',
  },
  button: {
    height: 36,
    width: 140,
    margin: '0 4px',
  },
})

class ExportPDFForm extends Component {
  handleClose = () => {
    this.props.closeModal()
  }
  handleInputChange = event => {
    this.props.handleChange(event)
  }

  handlePickerChange = (name, date) => {
    this.props.setFieldValue(name, date.toString())
  }

  render() {
    const { classes, values, isProcessing, handleSubmit } = this.props
    return (
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextInput
            name="owner"
            fullWidth
            label="Chủ phương tiện"
            value={values.owner}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <TextInput
            name="address"
            fullWidth
            label="Địa chỉ của chủ phương tiện"
            value={values.address}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
            <div class="form-group">
              <InlineDateTimePicker
                fullWidth
                ampm={false}
                label="Thời gian hen giải quyết"
                variant="outlined"
                format="dd/MM/yyyy HH:mm"
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
                value={values.schedule}
                onChange={date => this.handlePickerChange('schedule', date)}
              />
            </div>
          </MuiPickersUtilsProvider>
        </div>

        <div className={classes.actionsButton}>
          <Button variant="contained" onClick={this.handleClose} className={classes.button}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="Submit"
            className={classes.button}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <CircularProgress size={18} className={classes.progress} />
            ) : (
              'Xuất biên bản'
            )}
          </Button>
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ violations }) => ({
  isProcessing: violations.api.isExportingPDF,
})
export default connect(
  mapStateToProps,
  { closeModal },
)(withStyles(styles)(ExportPDFForm))
