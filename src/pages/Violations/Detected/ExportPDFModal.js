import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { Formik } from 'formik'
import ExportPDFForm from './ExportPDFForm'
import { closeModal } from 'actions/action_modal'
import { exportViolationPDF } from 'actions/action_violations'

const styles = theme => ({})

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: 8 * 1,
  },
  closeButton: {
    padding: 8,
    position: 'absolute',
    right: 8 / 2,
    top: 8 / 2,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 8 * 2,
    overflowX: 'hidden',
  },
}))(MuiDialogContent)

class ExportPDFModal extends Component {
  handleClose = () => {
    this.props.closeModal()
  }

  handleSubmit = values => {
    const {id} = this.props
    this.props.exportViolationPDF({id, values})
  }

  render() {
    const { classes, isOpen } = this.props
    return (
      <Dialog fullWidth="sm" open={isOpen} onClose={this.handleClose}>
        <DialogTitle onClose={this.handleClose}>Biên bản vi phạm</DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              owner: '',
              address: '',
              schedule: null,
            }}
            onSubmit={values => this.handleSubmit(values)}
            render={props => <ExportPDFForm {...props} />}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ modal, violations }) => ({
  isOpen: modal.isOpen,
  id: violations.currentViolationId
})

export default connect(
  mapStateToProps,
  { closeModal, exportViolationPDF },
)(withStyles(styles)(ExportPDFModal))
