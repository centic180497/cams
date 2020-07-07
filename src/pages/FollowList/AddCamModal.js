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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { Scrollbars } from 'react-custom-scrollbars'

import { closeModal } from '../../actions/action_modal'
import {
  fetchCamNotFollowed,
  addCamToFollowList,
} from '../../actions/action_followList'
import Loading from '../../components/Loading'
import { Checkbox } from '@material-ui/core'

const styles = theme => ({
  process: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  dialog: {
    height: '100%',
  },
  paper: {
    height: '100%',
  },
  card: {
    display: 'flex',
    marginBottom: 4,
  },
  cardLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  cardRight: {
    display: 'flex',
  },
  cardMediaWrapper: {
    width: 115,
  },
  cardMedia: {
    width: '100%',
    paddingTop: '56.25%',
  },
  cardContent: {
    padding: '0 13px !important',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    // lineHeight: 1.3,
    fontWeight: 500,
  },
  address: {
    fontSize: 12,
    // lineHeight: 1.3,
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

class AddCamModal extends Component {
  state = {
    selected: [],
  }

  componentDidMount() {
    this.props.fetchCamNotFollowed()
  }

  handleClose = () => {
    this.props.closeModal()
  }

  _onCardClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    this.setState({
      selected: newSelected,
    })
  }

  isSelected = id => {
    return this.state.selected.indexOf(id) !== -1
  }

  handleSubmit = () => {
    this.props.addCamToFollowList(this.state.selected)
  }

  render() {
    const { classes, isOpen, isFetching, cams = [] } = this.props
    return (
      <Dialog
        open={isOpen}
        onClose={this.handleClose}
        fullWidth
        maxWidth="lg"
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle onClose={this.handleClose}>Thêm camera</DialogTitle>
        <DialogContent>
          <Scrollbars style={{ width: '100%', height: '100%', minHeight: 500 }}>
            {isFetching ? (
              <Loading />
            ) : (
              cams.map((cam, index) => {
                const isSelected = this.isSelected(cam.id)
                return (
                  <Card
                    className={classes.card}
                    key={index}
                    onClick={event => this._onCardClick(event, cam.id)}
                  >
                    <div className={classes.cardLeft}>
                      <Checkbox color="primary" checked={isSelected} />
                    </div>
                    <div className={classes.cardRight}>
                      <div className={classes.cardMediaWrapper}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={cam.thumnail}
                        />
                      </div>
                      <div className={classes.details}>
                        <CardContent className={classes.cardContent}>
                          <Typography
                            variant="inherit"
                            noWrap
                            className={classes.name}
                          >
                            {cam.name}
                          </Typography>
                          <Typography
                            variant="inherit"
                            noWrap
                            className={classes.address}
                          >
                            {cam.address}
                          </Typography>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </Scrollbars>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.handleClose}>
            HỦY
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={this.state.selected.length === 0}
            onClick={this.handleSubmit}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ modal, followList }) => ({
  isOpen: modal.isOpen,
  isFetching: followList.isFetchingCamsNotFollowed,
  cams: followList.camsNotFollowed,
})

export default connect(
  mapStateToProps,
  {
    closeModal,
    fetchCamNotFollowed,
    addCamToFollowList,
  },
)(withStyles(styles)(AddCamModal))
