import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Loading from '../../components/Loading'
import CameraItem from './CameraItem'
import { Scrollbars } from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    // padding: '5px 0 5px 10px',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: '500',
    paddingLeft: 10
  },
  cameraList: {
    flexGrow: '1',
    paddingTop: 5,
  },
  wrapper: {
    padding: '5px 10px 0 10px'
  }
})

class SearchResult extends Component {
  render() {
    const {
      classes,
      isSitemap,
      isManageCam,
      isSearching,
      cameraList = [],
    } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          DANH SÁCH CAMERA ({cameraList.length})
        </div>
        <div className={classes.cameraList}>
          {isSearching ? (
            <Loading />
          ) : (
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <div className={classes.wrapper}>
                {cameraList.length === 0 && (
                  <Typography align="center">Không tìm thấy camera</Typography>
                )}
                {cameraList.map((camera, index) => (
                  <CameraItem key={index} detail={camera} />
                ))}
              </div>
            </Scrollbars>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, map }) => ({
  isSearching: cameras.isSearching,
  cameraList: cameras.cameras,
})
export default connect(mapStateToProps)(withStyles(styles)(SearchResult))
