import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { Typography } from '@material-ui/core'
import moment from 'moment'

const styles = theme => ({
  root: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    fontSize: 12,
    background: `rgba(33,33,33,1)`,
    color: 'white',
    borderRadius: 4,
    pointerEvents: 'none',
    transform: 'translate(50%, 0)'
  },
  table: {
    // position: 'absolute',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4,
  },
  time: {
    color: 'white',
    fontSize: 12,
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
  rect: { borderRadius: 4, marginRight: 4, width: 15, height: 15 },
  rectBike: {
    background: '#154360',
  },
  rectCar: {
    background: '#CA6F1E',
  },
  rectTruck: {
    background: 'red',
  },
  rectMinibus: {
    background: '#28B463',
  },
})

class Tooltip extends Component {
  render() {
    const { classes, data, scaleX, scaleY, vehicleType = [] } = this.props
    let total = 0
    vehicleType.forEach(key => {
      total += data[key]
    })
    console.log(total, scaleY(total))
    const styles = {
      top: scaleY(total),
      left: scaleX(data.timestamp),
    }
    return (
      <div className={classes.root} style={styles}>
        <Typography className={classes.time}>{moment(data.timestamp).format('DD-MM-YYYY HH:mm')}</Typography>
        <div className={classes.table}>
          {vehicleType.includes('bike') && (
            <div className={classes.row}>
              <div className={classNames(classes.rect, classes.rectBike)}></div>
              <Typography className={classes.text}>Xe máy: {data.bike}</Typography>
            </div>
          )}
          {vehicleType.includes('car') && (
            <div className={classes.row}>
              <div className={classNames(classes.rect, classes.rectCar)}></div>
              <Typography className={classes.text}>Ô tô: {data.car}</Typography>
            </div>
          )}
          {vehicleType.includes('truck') && (
            <div className={classes.row}>
              <div className={classNames(classes.rect, classes.rectTruck)}></div>
              <Typography className={classes.text}>Xe tải: {data.truck}</Typography>
            </div>
          )}
          {vehicleType.includes('minibus') && (
            <div className={classes.row}>
              <div className={classNames(classes.rect, classes.rectMinibus)}></div>
              <Typography className={classes.text}>Xe khách: {data.minibus}</Typography>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ flow }) => ({
  vehicleType: flow.type,
})
export default connect(mapStateToProps)(withStyles(styles)(Tooltip))
