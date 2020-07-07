import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import { TextField } from '@material-ui/core'
import { changeListSize } from 'actions/action_followList'

import qs from 'query-string'
const styles = (theme) => ({
  root: {
    width: 100,
  },
  formControl: {
    width: 100,
  },
  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(16px, 12px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '0 0 0 6px',
  },
})

class Size extends Component {
  handleChange = (event, value, reason) => {
    // const { location } = this.props
    // let searchParsed = qs.parse(location.search)
    // searchParsed.size = value.value
    // this.props.history.push({ search: qs.stringify(searchParsed) })
    this.props.changeListSize(value.value)
  }

  render() {
    const { classes, listSize } = this.props
    const sizeOptions = [
      { value: 4, label: '2x2' },
      { value: 9, label: '3x3' },
      { value: 16, label: '4x4' },
    ]
    let value = null

    switch (listSize) {
      case 4:
        value = { value: 4, label: '2x2' }
        break
      case 9:
        value = { value: 9, label: '3x3' }
        break
      case 16:
        value = { value: 16, label: '4x4' }
        break
    }
    return (
      <div className={classes.root}>
        <Autocomplete
          // open
          freeSolo
          blurOnSelect
          openOnFocus
          disableClearable
          size="small"
          options={sizeOptions}
          getOptionLabel={(option) => option.label}
          value={value}
          noOptionsText="Không có lựa chọn"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tỷ lệ"
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
  listSize: followList.listSize,
})
export default withRouter(
  connect(mapStateToProps, {
    changeListSize,
  })(withStyles(styles)(Size)),
)
