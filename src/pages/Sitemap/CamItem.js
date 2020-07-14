import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Info from '@material-ui/icons/Info'

import { showCamInfoModal } from 'actions/action_modal'
import {
  addCamToFollowList,
  removeCamFromFollowList,
} from 'actions/action_followList'
import { showInfoWindow, changeBoundsMap } from 'actions/action_map'
import { closePrevStreaming } from 'actions/action_streaming'

const styles = (theme) => ({
  card: {
    display: 'flex',
    marginTop: 5,
    // marginRight: 15,
    cursor: 'pointer',
  },
  cardMediaWrapper: {
    width: 130,
  },
  focused: {
    backgroundColor: '#e0e0e0',
  },
  details: {
    width: 'calc(100% - 130px)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  cardMedia: {
    width: '100%',
    paddingTop: '56.25%',
  },
  cardContent: {
    paddingTop: 5,
    paddingBottom: 0,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
  },
  name: {
    fontSize: 14,
    lineHeight: 1.5,
    fontWeight: 500,
  },
  address: {
    fontSize: 12,
    lineHeight: 1.5,
  },
  description: {
    lineHeight: '1.5em',
    fontSize: '0.825rem',
  },
  icon: {
    fontSize: 14,
  },
  iconButton: {
    padding: 6,
  },
})

class CamItem extends Component {
  _onSubscribeClick = (event) => {
    event.stopPropagation()
    const { id } = this.props.detail
    this.props.addCamToFollowList(Array(id))
  }

  _onUnSubscribeClick = (event) => {
    event.stopPropagation()
    const { id } = this.props.detail
    this.props.removeCamFromFollowList(Array(id))
  }

  _onInfoClick = (event) => {
    event.stopPropagation()
    this.props.showCamInfoModal()
  }

  test = () => {
    const { changeBoundsMap, detail } = this.props
    let { lat, lng } = detail
    // changeBoundsMap({ center: { lat, lng }, zoom: 15 })

  }

  _onCardClick = () => {
    const { infoWindow, changeBoundsMap } = this.props
    const { id, lat, lng } = this.props.detail
    if (infoWindow !== -1 && infoWindow !== id) {
      this.props.closePrevStreaming(infoWindow)
    }
    if (infoWindow !== id) {
      // this.test()
      // changeBoundsMap({ center: { lat, lng }, zoom: 15 })
      // console.log(this.props.zoom)

      this.props.showInfoWindow({
        center: { lat, lng },
        id,
        // zoom: 15
      })
    }
  }

  render() {
    const { classes, detail = {}, infoWindow, idCamera } = this.props

    const isShowInfoWindow = detail.id === infoWindow
    return (
      <Card
        className={classNames(classes.card, {
          [classes.focused]: isShowInfoWindow,
        })}
        onClick={this._onCardClick}
        // onClick={() => onClick(detail)}
      >
        <div className={classes.cardMediaWrapper}>
          <CardMedia className={classes.cardMedia} image={detail.thumnail} />
        </div>
        <div className={classes.details}>
          <CardContent className={classes.cardContent}>
            <Typography noWrap className={classes.name}>
              {detail.name}
            </Typography>
            <Typography noWrap className={classes.address}>
              {detail.address}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            {detail.is_in_followlist ? (
              <Tooltip arrow title="Bỏ theo dõi">
                <IconButton
                  className={classes.iconButton}
                  onClick={this._onUnSubscribeClick}
                >
                  <VisibilityOff className={classes.icon} />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip arrow title="Theo dõi">
                <IconButton
                  className={classes.iconButton}
                  onClick={this._onSubscribeClick}
                >
                  <Visibility className={classes.icon} />
                </IconButton>
              </Tooltip>
            )}

            {/* <Tooltip arrow title="Thông tin">
              <IconButton
                className={classes.iconButton}
                onClick={this._onInfoClick}
              >
                <Info className={classes.icon} />
              </IconButton>
            </Tooltip> */}
          </div>
        </div>
      </Card>
    )
  }
}

const mapStateToProps = ({ cameras, map }) => ({
  infoWindow: map.showInfoWindow,
  zoom: map.zoom,
})

export default connect(mapStateToProps, {
  showInfoWindow,
  closePrevStreaming,
  addCamToFollowList,
  removeCamFromFollowList,
  showCamInfoModal,
  changeBoundsMap,
})(withStyles(styles)(CamItem))
