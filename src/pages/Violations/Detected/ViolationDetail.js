import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Tooltip,
} from '@material-ui/core'
import {
  KeyboardBackspace,
  Delete,
  Check,
  Cancel,
  PictureAsPdf,
} from '@material-ui/icons'
import _ from 'lodash'
import { Scrollbars } from 'react-custom-scrollbars'

// import ArrowTooltip from 'components/TooltipWrapper'
import Loading from 'components/Loading'
import 'react-viewer/dist/index.css'

import {
  fetchViolationDetail,
  changeViolationParam,
  editViolationDetail,
  deleteViolations,
  deleteSingleViolation,
  approveViolations,
  unApproveViolations,
  exportViolationPDF,
} from 'actions/action_violations'
import { showExportPDfModal } from 'actions/action_modal'
import { Formik } from 'formik'
import ViolationDetailForm from './ViolationDetailForm'

const styles = (theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    fontSize: '0.875rem',
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
  toolbarWrapper: {},
  title: {
    fontSize: 16,
  },
  content: {
    flexGrow: 1,
  },
  form: {
    padding: 8,
  },
  thumnail: {
    height: 180,
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 400,
  },
  thumnailWrapper: {
    display: 'flex',
    // justifyContent: 'center',
  },
  videoWrapper: {
    display: 'flex',
    // justifyContent: 'center',
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    fontSize: 20,
  },
  actions: {
    marginLeft: 'auto',
  },
})

class ViolationDetail extends Component {
  state = {
    show: false,
  }

  handleSubmit = (values) => {
    this.props.editViolationDetail({ ...values })
  }

  handleDelete = () => {
    const { filter, page, detail } = this.props
    this.props.deleteSingleViolation({ filter, selected: [detail.id], page })
  }

  handleApprove = () => {
    const { detail } = this.props
    this.props.approveViolations([detail.id])
  }

  handleUnApprove = () => {
    const { detail } = this.props
    this.props.unApproveViolations([detail.id])
  }

  handleExportPdf = () => {
    this.props.showExportPDfModal()
    // const { detail } = this.props
    // this.props.exportViolationPDF(detail.id)
  }
  render() {
    const { classes, match, history, isFetching, detail = {} } = this.props
    let imgArr = []
    if (_.has(detail, 'thumnails'))
      imgArr = detail.thumnails.map((item) => ({
        src: item,
        alt: detail.plateNumber,
      }))
    if (isFetching) {
      return <Loading />
    }
    let values = {}

    if (detail.object === 'Xe máy') {
      values.vehicleType = { value: 2, label: 'Xe máy' }
    } else if (detail.object === 'Ô tô') {
      values.vehicleType = { value: 1, label: 'Ô tô' }
    }

    if (detail.type === 'Vượt đèn đỏ') {
      values.violationType = { value: 1, label: 'Vượt đèn đỏ' }
    } else if (detail.type === 'Lấn làn') {
      values.violationType = { value: 2, label: 'Lấn làn' }
    }

    values.address = detail.address
    values.plateNumber = detail.plate_number
    values.timestamp = detail.timestamp
    values.thumnails = [detail.prev_img, detail.vio_img, detail.plate_img]
    return (
      <div className={classes.root}>
        <div className={classes.toolbarWrapper}>
          <Toolbar>
            <div className={classes.titleWrapper}>
              <Typography className={classes.title}>
                Thông tin vi phạm
              </Typography>
            </div>
            <div className={classes.actions}>
              <Tooltip arrow title="Xóa">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleDelete}
                >
                  <Delete className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Duyệt">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleApprove}
                >
                  <Check className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Bỏ duyệt">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleUnApprove}
                >
                  <Cancel className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Xuất biên bản">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleExportPdf}
                >
                  <PictureAsPdf className={classes.icon} />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </div>
        <Divider />
        <div className={classes.content}>
          <Scrollbars style={{ width: '100%' }}>
            <div className="container">
              <Formik
                enableReinitialize
                initialValues={{
                  ...values,
                }}
                onSubmit={(values) => this.handleSubmit(values)}
                render={(props) => (
                  <ViolationDetailForm {...props} detail={detail} />
                )}
              />
            </div>
          </Scrollbars>
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ violations }) => {
  return {
    detail: violations.violationDetail,
    filter: violations.filter,
    page: violations.page,
    isFetching: violations.api.isFetchingViolationDetail,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    fetchViolationDetail,
    changeViolationParam,
    editViolationDetail,
    deleteViolations,
    deleteSingleViolation,
    approveViolations,
    unApproveViolations,
    exportViolationPDF,
    showExportPDfModal,
  })(withStyles(styles)(ViolationDetail)),
)
