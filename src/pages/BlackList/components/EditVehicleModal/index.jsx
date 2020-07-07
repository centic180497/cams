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

import EditVehicleForm from '../EditVehicleForm'
import { closeModal } from 'actions/action_modal'
import { fetchVehicleData, editVehicleData } from 'actions/action_blackList'
import styles from './styles'
import { CircularProgress } from '@material-ui/core'

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
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: 8,
  },
}))(MuiDialogActions)

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: 8 * 2,
    overflowX: 'hidden',
  },
}))(MuiDialogContent)

class EditVehicleModal extends Component {
  componentDidMount() {
    this.props.fetchVehicleData(this.props.currentVehicleId)
  }
  handleClose = () => {
    this.props.closeModal()
  }

  handleSubmit = values => {
    const { currentVehicleId } = this.props
    this.props.editVehicleData(currentVehicleId, values)
  }

  render() {
    const { classes, isOpen, formData = {}, isFetching } = this.props
    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        fullWidth
        maxWidth="sm"
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle onClose={this.handleClose}>
          Sửa thông tin phương tiện
        </DialogTitle>
        <DialogContent>
          {isFetching ? (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          ) : (
            <Formik
              enableReinitialize
              initialValues={{
                plate: formData.plate,
                desc: formData.desc,
              }}
              onSubmit={values => this.handleSubmit(values)}
              render={props => <EditVehicleForm {...props} />}
            />
          )}
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ modal, blackList }) => ({
  isOpen: modal.isOpen,
  isFetching: blackList.currentVehicle.api.pending,
  currentVehicleId: blackList.currentVehicle.id,
  formData: blackList.currentVehicle.formData,
})
export default connect(
  mapStateToProps,
  {
    closeModal,
    fetchVehicleData,
    editVehicleData,
  },
)(withStyles(styles)(EditVehicleModal))
