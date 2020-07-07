import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { TableHead, TableRow, TableCell, Checkbox } from '@material-ui/core'
import { updateSelectedVideos } from 'actions/action_record_videos'

const styles = theme => ({})

class EnhancedTableHead extends Component {
  handleCheckboxChange = event => {
    const { videos = [] } = this.props
    if (event.target.checked) {
      this.props.updateSelectedVideos(videos.map(row => row.id))
      return
    }
    this.props.updateSelectedVideos([])
  }

  render() {
    const { classes, videos = [], selected = [] } = this.props
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="none">
            <Checkbox
              color="primary"
              indeterminate={selected.length > 0 && selected.length < videos.length}
              checked={videos.length === selected.length && videos.length > 0}
              onChange={this.handleCheckboxChange}
            />
          </TableCell>
          <TableCell padding="none">Tên</TableCell>
          <TableCell padding="dense">Camera</TableCell>
          <TableCell padding="none">Thời điểm bắt đầu</TableCell>
          <TableCell padding="dense">Thời điểm kết thúc</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    selected: recordVideos.selected,
    videos: recordVideos.videos,
  }
}

export default connect(
  mapStateToProps,
  { updateSelectedVideos },
)(withStyles(styles)(EnhancedTableHead))
