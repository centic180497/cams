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
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { closeModal } from '../../actions/action_modal'
import { deleteCam } from '../../actions/action_camera'

const styles = theme => ({
  process: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

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
  },
}))(MuiDialogContent)

class DeleteCamModal extends Component {
  handleClose = () => {
    this.props.closeModal()
  }
  handleDelete = () => {
    const { data } = this.props
    this.props.deleteCam(data.id)
  }
  render() {
    const { classes, isOpen, data, isProcessing } = this.props
    return (
      <Dialog open={isOpen} onClose={this.handleClose}>
        <DialogTitle onClose={this.handleClose}>Xóa camera</DialogTitle>
        <DialogContent>Xóa camera {data.name} khỏi hệ thống?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleDelete}
            disabled={isProcessing}
          >
            Đồng ý
            {isProcessing && (
              <CircularProgress
                size={24}
                className={classes.process}
                color="primary"
              />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
const mapStateToProps = ({ modal, cameras }) => ({
  isOpen: modal.isOpen,
  data: modal.data,
  isProcessing: cameras.isProcessing,
})

export default connect(
  mapStateToProps,
  { closeModal, deleteCam },
)(withStyles(styles)(DeleteCamModal))
