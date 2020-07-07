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
import * as yup from 'yup'

import AddToBlackListForm from '../AddToBlackListForm'

import { addVehicleToBlackList } from '../../../../actions/action_blackList'
import { closeModal } from '../../../../actions/action_modal'
import styles from './styles'

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

const schema = yup.object().shape({
  plate: yup.string().required('Nhập biển số xe !')
})

class AddToBlackListModal extends Component {
  handleClose = () => {
    this.props.closeModal()
  }
  
  handleSubmit = values => {
    this.props.addVehicleToBlackList(values)
  }

  render() {
    const { classes, isOpen } = this.props
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
          Thêm phương tiện vào danh sách đen
        </DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            initialValues={{
              plate: '',
              desc: '',
            }}
            // validationSchema={schema}
            onSubmit={values => this.handleSubmit(values)}
            render={props => <AddToBlackListForm {...props} />}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ modal }) => ({
  isOpen: modal.isOpen,
})

export default connect(
  mapStateToProps,
  { addVehicleToBlackList, closeModal },
)(withStyles(styles)(AddToBlackListModal))
