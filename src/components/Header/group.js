import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { fetchFollowList } from 'actions/action_followList'

import qs from 'query-string'
const styles = (theme) => ({
  root: {
    width: 200,
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

class Group extends React.Component {
  handleChange = (event, value, reason) => {
    const { location } = this.props
    // let searchParsed = qs.parse(location.search)
    // searchParsed.groupId = value.value
    // this.props.history.push({ search: qs.stringify(searchParsed) })
    this.props.fetchFollowList({ group: value.value })
  }

  render() {
    const { classes, groups = [] } = this.props

    return (
      <div className={classes.root}>
        <Autocomplete
          // open
          freeSolo
          blurOnSelect
          disableClearable
          size="small"
          openOnFocus
          options={groups}
          getOptionLabel={(option) => option.label}
          defaultValue={{ value: 'all', label: 'Tất cả' }}
          noOptionsText="Không có lựa chọn"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nhóm"
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

const mapStateToProps = (state) => ({
  groups: state.followList.groups,
})

export default withRouter(
  connect(mapStateToProps, { fetchFollowList })(withStyles(styles)(Group)),
)
