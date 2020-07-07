import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'
import { filterRecordVideos } from 'actions/action_record_videos'

const styles = (theme) => ({
  root: {
    padding: '0 8px',
  },
  chip: {
    margin: 4,
  },
})

class FilterChip extends Component {
  handleDelete = (chip) => () => {
    let { filter = {} } = this.props
    if (chip.type === 'camera') {
      filter.cameras = filter.cameras.filter((cam) => cam.value !== chip.value)
    } else filter[chip.type] = { value: 0, label: 'Tất cả' }

    this.props.filterRecordVideos({ filter, page: 1 })
  }
  render() {
    const { classes, chips = [] } = this.props
    return (
      <div className={classes.root}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip.label}
            onDelete={this.handleDelete(chip)}
            className={classes.chip}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  let chips = []
  const { filter } = recordVideos
  if (filter.cameras.length) {
    const listCam = filter.cameras.map((cam) => ({
      type: 'camera',
      value: cam.value,
      label: cam.label,
    }))
    chips.push(...listCam)
  }
  return {
    chips,
    filter: recordVideos.filter,
  }
}

export default connect(mapStateToProps, {filterRecordVideos})(withStyles(styles)(FilterChip))
