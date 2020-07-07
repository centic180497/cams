import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TablePagination,
  IconButton,
} from '@material-ui/core'
import { PlayCircleOutline } from '@material-ui/icons'
import TablePaginationActions from './TablePaginationActions'
import { fetchCamRecordVideos, updateSelectedRecordVideos } from 'actions/action_camera'

import EnhancedTableHead from './EnhancedTableHead'
import Loading from 'components/Loading'
import ArrowTooltip from 'components/TooltipWrapper'

const styles = theme => ({
  root: { display: 'flex', height: '100%', flexDirection: 'column' },
  tableWrapper: { flexGrow: 1 },
  table: { paddingRight: 8 },
  pagination: {},
  checkbox: {},
})

class VideoDataTable extends Component {
  componentDidMount() {
    this.props.fetchCamRecordVideos()
  }
  isSelected = id => {
    const { selected = [] } = this.props
    return selected.indexOf(id) !== -1
  }

  handleCheckBoxChange = (event, id) => {
    event.stopPropagation()

    const { selected } = this.props
    const selectedIndex = selected.indexOf(id)

    let newSelected = []

    if (selectedIndex === -1) {
      newSelected.concat(selected, id)
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

    this.props.updateSelectedRecordVideos(newSelected)
  }
  handlePageChange = () => {}

  handlePlayClick = event => {
    event.stopPropagation()
  }

  render() {
    const { classes, isFetching, videos = [] } = this.props
    if (isFetching) {
      return <Loading size={20} />
    }
    return (
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <Scrollbars style={{ width: '100%' }}>
            <Table className={classes.table}>
              <EnhancedTableHead />
              <TableBody>
                {videos.map(row => {
                  const isSelected = this.isSelected(row.id)
                  return (
                    <TableRow key={row.id} hover>
                      <TableCell align="left" padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isSelected}
                          className={classes.checkbox}
                          onClick={event => this.handleCheckBoxChange(event, row.id)}
                        />
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.savedAt}</TableCell>
                      <TableCell align="left">{row.duration}</TableCell>
                      <TableCell align="left">
                        <ArrowTooltip title="Xem video">
                          <IconButton onClick={this.handlePlayClick}>
                            <PlayCircleOutline />
                          </IconButton>
                        </ArrowTooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Scrollbars>
        </div>
        <div className={classes.pagination}>
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            count={300}
            // colSpan={3}
            rowsPerPage={15}
            page={0}
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong tổng số ${count}`}
            ActionsComponent={TablePaginationActions}
            onChangePage={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    isFetching: recordVideos.api.isFetchingRecordVideos,
    videos: recordVideos.videos,
    selected: recordVideos.selected,
    page: recordVideos.page,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchCamRecordVideos,
    updateSelectedRecordVideos,
  },
)(withStyles(styles)(VideoDataTable))
