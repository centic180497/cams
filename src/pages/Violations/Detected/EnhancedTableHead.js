import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core'
import { updateSelectedViolations } from 'actions/action_violations'

const styles = themes => ({
  checkBox: {
    paddingLeft: 0,
    paddingRight: 0,
  },
})

class EnhancedTableHead extends Component {
  handleCheckboxChange = event => {
    const { violations = [] } = this.props
    if (event.target.checked) {
      this.props.updateSelectedViolations(violations.map(row => row.id))
      return
    }
    this.props.updateSelectedViolations([])
  }

  render() {
    const { classes, violations = [], selected = [] } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell style={{ width: 50 }} padding="none">
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < violations.length}
              checked={violations.length === selected.length && selected.length > 0}
              onChange={this.handleCheckboxChange}
            />
          </TableCell>
          <TableCell padding="none">Ảnh</TableCell>
          <TableCell padding="dense">Biển số</TableCell>
          <TableCell padding="none">Loại xe</TableCell>
          <TableCell padding="dense">Loại vi phạm</TableCell>
          <TableCell padding="none">Thời gian</TableCell>
          <TableCell padding="dense">Camera</TableCell>
          <TableCell padding="none">Trạng thái</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

const mapStateToProps = ({ violations }) => {
  return {
    selected: violations.selected,
    violations: violations.violations,
  }
}

export default connect(
  mapStateToProps,
  {
    updateSelectedViolations,
  },
)(withStyles(styles)(EnhancedTableHead))
