import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TablePagination, IconButton } from '@material-ui/core'
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons'
import { filterRecordVideos } from 'actions/action_record_videos'

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: 8 * 2.5,
  },
})

class TablePaginationActions extends Component {
  handleClick = (type, event) => {
    const { page, filter, totalPage } = this.props
    let currentPage = page + 1

    if (type === 'next') {
      currentPage = currentPage + 1
    } else if (type === 'prev') {
      currentPage = currentPage - 1
    } else if (type === 'first') {
      currentPage = 1
    } else if (type === 'last') {
      currentPage = totalPage
    }

    this.props.filterRecordVideos({ filter, page: currentPage })
  }

  render() {
    const { classes, totalPage, page } = this.props
    return (
      <div className={classes.root}>
        <IconButton onClick={event => this.handleClick('first', event)} disabled={page === 0}>
          <FirstPageIcon />
        </IconButton>
        <IconButton onClick={event => this.handleClick('prev', event)} disabled={page === 0}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={event => this.handleClick('next', event)}
          disabled={totalPage === 0 || page === totalPage - 1}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={event => this.handleClick('last', event)}
          disabled={totalPage === 0 || page === totalPage - 1}
        >
          <LastPageIcon />
        </IconButton>
      </div>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    filter: recordVideos.filter,
    totalPage: recordVideos.totalPage,
    // page: violations.page,
  }
}

export default connect(
  mapStateToProps,
  { filterRecordVideos },
)(withStyles(styles)(TablePaginationActions))
