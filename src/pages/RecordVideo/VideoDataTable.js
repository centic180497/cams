import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import {
  Table,
  TableBody,
  Tab,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
} from '@material-ui/core'
import {grey} from '@material-ui/core/colors'
import EnhancedTableHead from './EnhancedTableHead'
import TablePaginationActions from './TablePaginationActions'
import {
  filterRecordVideos,
  updateSelectedVideos,
  displayVideo,
} from 'actions/action_record_videos'
import Loading from 'components/Loading'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  },
  table: {
    flexGrow: 1,
  },
  row: {
    cursor: 'pointer',
  },
  rowSelected: {
    backgroundColor: grey[300]
  },
})

class VideoDataTable extends Component {
  componentDidMount() {
    const { filter, page } = this.props
    this.props.filterRecordVideos({ filter, page })
  }

  isSelected = id => {
    const { selected = [] } = this.props
    return selected.indexOf(id) !== -1
  }

  handleCheckboxChange = (event, id) => {
    event.stopPropagation()
    const { selected = [] } = this.props
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
    this.props.updateSelectedVideos(newSelected)
  }

  handleClick = (event, id) => {
    this.props.displayVideo(id)
  }

  render() {
    const { classes, isFiltering, videos = [], page, total, currentVideoId } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.table}>
          <Scrollbars style={{ width: '100%' }}>
            <Table size="small">
              <EnhancedTableHead />
              <TableBody>
                {isFiltering ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Loading size={30} />
                    </TableCell>
                  </TableRow>
                ) : (
                  videos.map(row => {
                    const isSelected = this.isSelected(row.id)
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={event => this.handleClick(event, row.id)}
                        className={classNames(classes.row, {
                          [classes.rowSelected]: row.id === currentVideoId
                        })}
                      >
                        <TableCell align="left" padding="none">
                          <Checkbox
                            color="primary"
                            checked={isSelected}
                            onClick={event => this.handleCheckboxChange(event, row.id)}
                          />
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.name}
                        </TableCell>
                        <TableCell align="left" padding="dense">
                          {row.cam_name}
                        </TableCell>
                        <TableCell align="left" padding="none">
                          {row.start}
                        </TableCell>
                        <TableCell align="left" padding="dense">
                          {row.end}
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

const mapStateToProps = ({ recordVideos }) => {
  return {
    page: recordVideos.page,
    filter: recordVideos.filter,
    selected: recordVideos.selected,
    videos: recordVideos.videos,
    isFiltering: recordVideos.api.isFiltering,
    total: recordVideos.total,
    totalPage: recordVideos.totalPage,
    currentVideoId: recordVideos.currentVideoId
  }
}

export default connect(
  mapStateToProps,
  { filterRecordVideos, updateSelectedVideos, displayVideo },
)(withStyles(styles)(VideoDataTable))
