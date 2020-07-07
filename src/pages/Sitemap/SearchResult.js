import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import CamItem from './CamItem'
import { Scrollbars } from 'react-custom-scrollbars'
import Typography from '@material-ui/core/Typography'
import Loading from '../../components/Loading'

const styles = theme => ({
  root: {
    // padding: '5px 0 5px 10px',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 500,
    paddingLeft: 10
  },
  cameraList: {
    flexGrow: 1,
    // paddingTop: 5,
  },
  wrapper:{
    padding: '5px 10px 0 10px'
  }
})

class SearchResult extends Component {
  render() {
    const { classes, cams = [], isSearching,onClick } = this.props

    
    return (
      <div className={classes.root}>
        <Typography noWrap className={classes.title}>
          DANH SÁCH CAMERA ({cams.length})
        </Typography>
        <div className={classes.cameraList}>
          <Scrollbars style={{ width: '100%', height: '100%' }}>
            <div className={classes.wrapper}>  
              {isSearching ? (
                <Loading />
              ) : (
                <Fragment>
                  {cams.length === 0 && !isSearching && (
                    <Typography align="center">Không tìm thấy camera</Typography>
                  )}
                  {cams.map((cam, index) => (
                    <CamItem key={index} detail={cam} onClick={onClick} />
                  ))}
                </Fragment>
              )}
            </div>
          </Scrollbars>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  cams: cameras.cameras,
  isSearching: cameras.isSearching,
})

export default connect(mapStateToProps)(withStyles(styles)(SearchResult))
