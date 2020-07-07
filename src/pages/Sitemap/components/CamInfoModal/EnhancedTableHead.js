import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core'
import { CheckBox } from '@material-ui/icons'
import { updateSelectedRecordVideos } from 'actions/action_camera'

const headRows = [
  { id: 'name', label: 'Tên Video' },
  { id: 'savedAt', label: 'Thời điểm lưu' },
  { id: 'duration', label: 'Độ dài' },
  { id: 'actions', label: 'Hành động' },
]
const styles = theme => ({})

class EnhancedTableHead extends Component {
  handleCheckboxChange = event => {
    const { videos = [] } = this.props
    if (event.target.checked) {
      this.props.updateSelectedRecordVideos(videos.map(row => row.id))
      return
    }
    this.props.updateSelectedRecordVideos([])
  }
  render() {
    const { classes, videos = [], selected = [] } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < videos.length}
              checked={videos.length === selected.length}
              onChange={this.handleCheckboxChange}
            />
          </TableCell>
          {headRows.map(row => (
            <TableCell key={row.id}>{row.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    videos: recordVideos.videos,
    selected: recordVideos.selected,
  }
}

export default connect(
  mapStateToProps,
  {
    updateSelectedRecordVideos,
  },
)(withStyles(styles)(EnhancedTableHead))
