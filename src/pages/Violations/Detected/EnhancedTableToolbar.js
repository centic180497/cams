import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Toolbar,
  Typography,
  IconButton,
  Popover,
  Tooltip,
} from '@material-ui/core'
import { TuneOutlined, Search , Delete, Check, Cancel } from '@material-ui/icons'
import { indigo } from '@material-ui/core/colors'
import { Formik } from 'formik'
import Filter from './Filter'
import SearchStringForm from './SearchStringForm'
import { toggleViolationsFilter } from 'actions/action_ui'
import {
  filterViolations,
  approveViolations,
  unApproveViolations,
  deleteViolations,
} from 'actions/action_violations'

const styles = theme => ({
  root: {},
  hightlight: {
    color: indigo[900],
    backgroundColor: indigo[100],
  },
  title: {
    fontSize: 16,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
  },
  search: {
    marginRight: 16,
  },
  paper: {
    display: 'flex',
  },
  iconButton: {
    padding: 10,
  },
  searchInput: {
    width: 250,
    paddingLeft: 8,
  },
  divider: {
    height: 28,
    margin: 4,
    width: 1,
  },
  icon: {
    fontSize: 20,
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
})

class EnhancedTableToolbar extends Component {
  state = {
    q: '',
    anchorEl: null,
  }

  handleChange = event => {
    this.setState({
      q: event.target.value,
    })
  }

  handleSubmit = values => {
    this.props.filterViolations({ filter: values, page: 1 })
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handleApprove = () => {
    const { selected } = this.props
    this.props.approveViolations(selected)
  }

  handleUnApprove = () => {
    const { selected = [] } = this.props
    this.props.unApproveViolations(selected)
  }

  handleDelete = () => {
    const { selected, filter, page } = this.props
    this.props.deleteViolations({ filter, selected, page })
  }

  render() {
    const { classes, selected = [], filter } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.hightlight]: selected.length > 0,
        })}
      >
        <div>
          {selected.length > 0 ? (
            <Typography noWrap className={classes.title} color="inherit">
              {selected.length} vi phạm
            </Typography>
          ) : (
            <Typography noWrap className={classes.title}>
              Danh sách vi phạm
            </Typography>
          )}
        </div>
        <div className={classes.spacer}></div>
        <div className={classes.actions}>
          {selected.length > 0 ? (
            <Fragment>
              <Tooltip arrow title="Duyệt">
                <IconButton className={classes.iconButton} onClick={this.handleApprove}>
                  <Check className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Bỏ duyệt">
                <IconButton className={classes.iconButton} onClick={this.handleUnApprove}>
                  <Cancel className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Xóa">
                <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                  <Delete className={classes.icon} />
                </IconButton>
              </Tooltip>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.search}>
                <Formik
                  enableReinitialize
                  initialValues={{ ...filter }}
                  onSubmit={values => this.handleSubmit(values)}
                  render={props => <SearchStringForm {...props} />}
                />
              </div>
              <Tooltip arrow title="Lọc">
                <IconButton onClick={this.handleClick}>
                  <TuneOutlined className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Popover
                id="filter-violation"
                anchorEl={anchorEl}
                open={open}
                disablePortal
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <Filter />
              </Popover>
            </Fragment>
          )}
        </div>
      </Toolbar>
    )
  }
}
const mapStateToProps = ({ violations }) => {
  return {
    filter: violations.filter,
    selected: violations.selected,
    page: violations.page,
  }
}

export default connect(
  mapStateToProps,
  {
    toggleViolationsFilter,
    filterViolations,
    approveViolations,
    unApproveViolations,
    deleteViolations,
    
  },
)(withStyles(styles)(EnhancedTableToolbar))
