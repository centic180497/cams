import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { indigo } from '@material-ui/core/colors'
import { Toolbar, Typography, IconButton, Popover, Tooltip } from '@material-ui/core'
import { Delete, TuneOutlined } from '@material-ui/icons'
import ArrowTooltip from 'components/TooltipWrapper'
import Filter from './Filter'

import { deleteRecordVideos } from 'actions/action_record_videos'
const styles = theme => ({
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
    anchorEl: null,
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

  handleDelete = () => {
    const { selected, filter, page } = this.props
    this.props.deleteRecordVideos({ filter, selected, page })
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
              {selected.length} video
            </Typography>
          ) : (
            <Typography noWrap className={classes.title}>
              Danh sách video
            </Typography>
          )}
        </div>
        <div className={classes.spacer}></div>
        <div className={classes.actions}>
          {selected.length > 0 ? (
            <Fragment>
              <Tooltip arrow title="Xóa">
                <IconButton className={classes.iconButton} onClick={this.handleDelete}>
                  <Delete className={classes.icon} />
                </IconButton>
              </Tooltip>
            </Fragment>
          ) : (
            <Fragment>
              <div className={classes.search}></div>
              <Tooltip arrow title="Lọc">
                <IconButton onClick={this.handleClick}>
                  <TuneOutlined className={classes.icon} />
                </IconButton>
              </Tooltip>
              <Popover
                id="filter-video"
                anchorEl={anchorEl}
                open={open}
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

const mapStateToProps = ({ recordVideos }) => {
  return {
    selected: recordVideos.selected,
    page: recordVideos.page,
    filter: recordVideos.filter
  }
}

export default connect(
  mapStateToProps,
  { deleteRecordVideos },
)(withStyles(styles)(EnhancedTableToolbar))
