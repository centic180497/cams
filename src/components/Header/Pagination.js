import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { changeFollowListPage } from 'actions/action_followList'

import qs from 'query-string'
const styles = (theme) => ({
  root: {
    width: 110,
    paddingRight: 10,
  },
  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.85rem',
    transform: 'translate(16px, 12px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.85rem',
    padding: '0 0 0 6px',
  },
})

class Pagination extends Component {
  handleChange = (event, value, reason) => {
    // const { location } = this.props
    // let searchParsed = qs.parse(location.search)
    // searchParsed.page = value.value
    // this.props.history.push({ search: qs.stringify(searchParsed) })
    this.props.changeFollowListPage(value.value)
  }

  render() {
    const { classes, currentPage, totalPage } = this.props
    let pageOptions = []
    for (let i = 1; i <= totalPage; i++) {
      pageOptions.push({ value: i, label: i })
    }
    const value = { value: currentPage, label: currentPage }
    return (
      <div className={classes.root}>
        <Autocomplete
          // open
          freeSolo
          blurOnSelect
          openOnFocus
          disableClearable
          size="small"
          options={pageOptions}
          getOptionLabel={(option) => option.label.toString()}
          value={value}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Trang"
              margin="normal"
              variant="outlined"
            />
          )}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ followList }) => ({
  currentPage: followList.currentPage,
  totalPage: followList.totalPage,
})

export default withRouter(connect(mapStateToProps, {
  changeFollowListPage: changeFollowListPage,
})(withStyles(styles)(Pagination)))
