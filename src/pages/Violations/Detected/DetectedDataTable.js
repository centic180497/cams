import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Typography,
  Checkbox,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import { Done, WarningRounded } from '@material-ui/icons'
import { green, yellow, grey } from '@material-ui/core/colors'

import { Scrollbars } from 'react-custom-scrollbars'
import EnhancedTableHead from './EnhancedTableHead'
import Loading from 'components/Loading'
import TablePaginationActions from './TablePaginationActions'
import {
  fetchViolations,
  updateSelectedViolations,
  fetchViolationDetail,
  filterViolations,
} from 'actions/action_violations'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  table: {
    flexGrow: 1,
  },
  pagination: {
    flexGrow: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    marginTop: 4,
    marginBottom: 4,
  },
  chipApproved: {
    color: green[900],
    borderColor: green[900],
  },
  chipNotApproved: {
    color: yellow[900],
    borderColor: yellow[900],
  },
  row: {
    cursor: 'pointer',
  },
  rowSelected: {
    backgroundColor: grey[300]
  },
})

class DetectedDataTable extends Component {
  componentDidMount() {
    const { page, filter } = this.props
    this.props.filterViolations({ filter, page })
  }

  isSelected = id => {
    const { selected = [] } = this.props
    return selected.indexOf(id) !== -1
  }

  // Handle check box change
  handleCheckBoxChange = (event, id) => {
    event.stopPropagation()
    const { selected } = this.props
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
    this.props.updateSelectedViolations(newSelected)
  }

  // Handle Page Change
  handleChangePage = () => {}

  handleChangeRowsPerPage = () => {}

  handleTableRowClick = (event, id) => {
    const { currentViolationId } = this.props

    if (currentViolationId !== id) {
      this.props.fetchViolationDetail({ id })
    }
  }

  renderTableBody = violations => {}

  render() {
    const {
      classes,
      violations = [],
      isFetchingViolations,
      selected = [],
      currentViolationId,
      page,
      total,
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.table}>
          <Scrollbars style={{ width: '100%' }}>
            <Table size="small">
              <EnhancedTableHead />
              <TableBody>
                {isFetchingViolations ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Loading size={30} />
                    </TableCell>
                  </TableRow>
                ) : (
                  violations.map(row => {
                    const isSelected = this.isSelected(row.id)
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        className={classNames(classes.row, {
                          [classes.rowSelected]: row.id === currentViolationId,
                        })}
                        onClick={event => this.handleTableRowClick(event, row.id)}
                      >
                        <TableCell align="left" padding="none">
                          <Checkbox
                            color="primary"
                            checked={isSelected}
                            onClick={event => this.handleCheckBoxChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell padding="none">
                          <img
                            alt="Ảnh vi phạm"
                            src={`${row.plate_img}`}
                            className={classes.avatar}
                            onClick={e => e.stopPropagation()}
                          />
                        </TableCell>
                        <TableCell align="left" padding="dense">
                          <Typography noWrap>{row.plate_number}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="none">
                          <Typography noWrap>{row.object}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="dense">
                          <Typography noWrap>{row.type}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="none">
                          <Typography noWrap>{row.timestamp}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="dense">
                          <Typography noWrap>{row.cam_name}</Typography>
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.status === 2 ? (
                            <Chip
                              variant="outlined"
                              color="primary"
                              classes={{
                                outlinedPrimary: classes.chipApproved,
                              }}
                              size="small"
                              label="Đã duyệt"
                              icon={<Done />}
                            />
                          ) : (
                            <Chip
                              variant="outlined"
                              color="primary"
                              classes={{
                                outlinedPrimary: classes.chipNotApproved,
                              }}
                              size="small"
                              label="Chưa duyệt"
                              icon={<WarningRounded/>}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </Scrollbars>
        </div>
        <div className={classes.pagination}>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            colSpan={3}
            count={total}
            rowsPerPage={20}
            page={page - 1}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong tổng số ${count}`}
            ActionsComponent={TablePaginationActions}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ violations }) => {
  return {
    violations: violations.violations,
    filter: violations.filter,
    selected: violations.selected,
    page: violations.page,
    total: violations.total,
    totalPage: violations.totalPage,
    currentViolationId: violations.currentViolationId,
    isFetchingViolations: violations.api.isFetchingViolations,
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    { fetchViolations, updateSelectedViolations, fetchViolationDetail, filterViolations },
  )(withStyles(styles)(DetectedDataTable)),
)
