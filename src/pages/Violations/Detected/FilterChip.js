import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Chip } from '@material-ui/core'
import { Done as DoneIcon } from '@material-ui/icons'
import { filterViolations } from 'actions/action_violations'

const styles = theme => ({
  root: {
    padding: '0 8px',
  },
  chip: {
    margin: 4,
  },
})

class FilterChip extends Component {
  handleDelete = chip => () => {
    let filter = this.props.filter || {}
    if (chip.type === 'camera') {
      filter.cameras = filter.cameras.filter(cam => cam.value !== chip.value)
    } else filter[chip.type] = { value: 0, label: 'Tất cả' }
    this.props.filterViolations({ filter, page: 1 })
  }

  render() {
    const { classes, chips = [] } = this.props
    return (
      <div className={classes.root}>
        {chips.map((chip, index) => {
          return (
            <Chip
              key={index}
              label={chip.label}
              onDelete={this.handleDelete(chip)}
              className={classes.chip}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ violations }) => {
  let chips = []
  const { filter } = violations
  if (filter.vehicleType.value) {
    chips.push({
      type: 'vehicleType',
      value: filter.vehicleType.value,
      label: `Loại xe: ${filter.vehicleType.label}`,
    })
  }

  if (filter.violationType.value) {
    chips.push({
      type: 'violationType',
      value: filter.violationType.value,
      label: `Loại vi phạm: ${filter.violationType.label}`,
    })
  }

  if (filter.status.value) {
    chips.push({
      type: 'status',
      value: filter.status.value,
      label: `Trạng thái: ${filter.status.label}`,
    })
  }

  if (filter.cameras.length) {
    const listCam = filter.cameras.map(cam => ({
      type: 'camera',
      value: cam.value,
      label: cam.label,
    }))
    chips.push(...listCam)
  }

  return {
    chips,
    filter: violations.filter,
  }
}

export default connect(
  mapStateToProps,
  { filterViolations },
)(withStyles(styles)(FilterChip))
