import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Paper } from '@material-ui/core'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import DetectedDataTable from './DetectedDataTable'
import ViolationDetail from './ViolationDetail'
import FilterChip from './FilterChip'

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  toolbarWrapper: {},
  dataTable: {
    // width: 'calc(100% - 300px)',
    // width: '100%',
    width: '65%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dataTableWithFilter: {
    // width: 'calc(100% - 300px)',
    width: '50%',
  },
  tableWrapper: {
    flexGrow: 1,
  },
  filter: {},

  detail: {
    width: 'calc(35% - 8px)',
    // marginLeft: 8,
  },
  spacer: {
    width: 8,
  },
  chipWrapper: {},
})

class Detected extends Component {
  render() {
    const { classes, showFilter, currentViolationId } = this.props
    return (
      <div className={classes.root}>
        <Paper
          className={classNames(classes.dataTable, {
            showFilter: classes.dataTableWithFilter,
          })}
        >
          <div className={classes.toolbarWrapper}>
            <EnhancedTableToolbar />
          </div>
          <div className={classes.chipWrapper}>
            <FilterChip />
          </div>
          <div className={classes.tableWrapper}>
            <DetectedDataTable />
          </div>
        </Paper>
        <div className={classes.spacer}></div>
        {/* <Paper className={classes.filter}>{showFilter && <Filter />}</Paper> */}
        {currentViolationId !== -1 && (
          <Paper className={classes.detail}>
            <ViolationDetail />
          </Paper>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ ui, violations }) => {
  return {
    currentViolationId: violations.currentViolationId,
    showFilter: ui.violationsFilter,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Detected))
