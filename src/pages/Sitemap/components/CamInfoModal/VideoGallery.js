import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import VideoDataTable from './VideoDataTable'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  toolbar: {
    flexGrow: 0,
  },
  table: {
    flexGrow: 1,
  },
  right: {
    width: '50%',
    borderLeft: '1px solid #ccc',
  },
})

class VideoGallery extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <div classes={classes.toolbar}>
            <EnhancedTableToolbar />
          </div>
          <div className={classes.table}>
            <VideoDataTable />
          </div>
        </div>
        <div className={classes.right}></div>
      </div>
    )
  }
}

export default withStyles(styles)(VideoGallery)
