import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import _ from 'lodash'
import classNames from 'classnames'

import noImage from 'assets/images/nopicture.jpg'

import { focusVehicleHistory } from 'actions/action_blackList'

import styles from './styles'

class VehicleHistoryItem extends Component {
  handleClick = () => {
    this.props.focusVehicleHistory(this.props.data)
  }

  render() {
    const { classes, data, focusedVehicle } = this.props
    return (
      <div className={classes.root}>
        <Card
          className={classNames(classes.card, {
            [classes.focused]: focusedVehicle.id === data.id,
          })}
          onClick={this.handleClick}
        >
          <div className={classes.cardMediaWrapper}>
            <CardMedia
              className={classes.cardMedia}
              image={
                _.has(data, 'plate_img') && !_.isEmpty(data.plate_img)
                  ? data.plate_img
                  : noImage
              }
            />
          </div>
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography noWrap className={classes.plate}>
                {data.plate_number}
              </Typography>
              <Typography noWrap className={classes.camName}>
                {data.camera.name}
              </Typography>
              <Typography noWrap className={classes.address}>
                {data.address}
              </Typography>
              <Typography noWrap className={classes.time}>
                {data.timestamp}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ({ blackList }) => ({
  focusedVehicle: blackList.vehicleHistory.focusedVehicle,
})
export default connect(
  mapStateToProps,
  { focusVehicleHistory },
)(withStyles(styles)(VehicleHistoryItem))
