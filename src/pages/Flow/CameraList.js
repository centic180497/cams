import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Scrollbars } from 'react-custom-scrollbars'
import { Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import { fetchAllCams } from 'actions/action_camera'
import { fetchFlowCameras } from 'actions/action_flow'
import Loading from 'components/Loading'

const styles = theme => ({
  root: {
    width: 350,
    height: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    borderRight: `1px solid ${grey[300]}`,
  },
  activeClassName: {
    display: 'block !important',
    backgroundColor: grey[300],
  },
  camItem: {
    borderBottom: `1px solid ${grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 8,
  },
  avatar: {
    width: 115,
  },
  avatarImg: {
    width: '100%',
    height: 65,
  },
  info: {
    width: 'calc(100% - 115px)',
    padding: 8,
  },
  name: {
    // fontWeight: 500,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  address: {},
})

class CameraList extends Component {
  componentDidMount() {
    this.props.fetchFlowCameras()
  }
  render() {
    const { classes, cams = [], isFetchingCameras } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <Scrollbars style={{ width: '100%' }}>
            {isFetchingCameras ? (
              <Loading size={24}/>
            ) : (
              cams.map((cam, index) => (
                <NavLink
                  to={`/dashboard/flow/${cam.cam_id}`}
                  activeClassName={classes.activeClassName}
                  key={index}
                >
                  <div className={classes.camItem}>
                    <div className={classes.avatar}>
                      <img
                        src={`${cam.thumnail}`}
                        className={classes.avatarImg}
                      />
                    </div>
                    <div className={classes.info}>
                      <Typography noWrap className={classes.name}>
                        {cam.cam_name}
                      </Typography>
                      <Typography noWrap className={classes.address}>
                        {cam.address}
                      </Typography>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ flow }) => {
  return {
    cams: flow.cameras,
    isFetchingCameras: flow.api.isFetchingCameras,
  }
}

export default connect(
  mapStateToProps,
  {
    fetchFlowCameras,
  },
)(withStyles(styles)(CameraList))
