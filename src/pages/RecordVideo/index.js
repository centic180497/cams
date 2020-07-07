import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles, Paper } from '@material-ui/core'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import FilterChip from './FilterChip'
import VideoDataTable from './VideoDataTable'
import VideoView from './VideoView'

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
  },
  toolbarWrapper: {},
  paper: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  tableWrapper: {
    flexGrow: 1,
  },
  spacer: {
    width: 8,
  },
  detail: {
    width: 'calc(50% - 8px)',
    // marginLeft: 8,
  },
})

class RecordVideo extends Component {
  render() {
    const { classes, currentVideoId } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.toolbarWrapper}>
            <EnhancedTableToolbar />
          </div>
          <div className={classes.chipWrapper}>
            <FilterChip />
          </div>
          <div className={classes.tableWrapper}>
            <VideoDataTable />
          </div>
        </Paper>
        <div className={classes.spacer}></div>
        {currentVideoId !== -1 && (
          <Paper className={classes.detail}>
            <VideoView />
          </Paper>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    currentVideoId: recordVideos.currentVideoId,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(RecordVideo))
