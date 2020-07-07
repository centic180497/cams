import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Paper, InputBase, IconButton, Divider } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'

const styles = theme => ({
  paper: { display: 'flex' },
  searchInput: { width: 250, paddingLeft: 8 },
  divider: { height: 28, margin: 4, width: 1 },
  iconButton: { padding: 10 },
  icon: { fontSize: 20 },
})

class SearchStringForm extends Component {
  render() {
    const { classes, values, handleChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <Paper className={classes.paper}>
          <InputBase
            name="q"
            className={classes.searchInput}
            placeholder="Tìm kiếm"
            value={values.q}
            onChange={handleChange}
          />
          <Divider className={classes.divider} />
          <IconButton className={classes.iconButton} type="submit">
            <SearchIcon className={classes.icon} />
          </IconButton>
        </Paper>
      </form>
    )
  }
}

export default withStyles(styles)(SearchStringForm)
