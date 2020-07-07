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

const styles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: 8 * 2.5,
  },
  iconButton: {
    padding: 8
  },
  icon: {
    fontSize: 20
  }
})

class TablePaginationActions extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <IconButton className={classes.iconButton}>
          <FirstPageIcon className={classes.icon}/>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <KeyboardArrowLeft className={classes.icon}/>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <KeyboardArrowRight className={classes.icon}/>
        </IconButton>
        <IconButton className={classes.iconButton}>
          <LastPageIcon className={classes.icon}/>
        </IconButton>
      </div>
    )
  }
}

export default withStyles(styles)(TablePaginationActions)
