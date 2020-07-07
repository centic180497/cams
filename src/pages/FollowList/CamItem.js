import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Checkbox,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core'

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 4,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    display: 'flex',
  },
  cardMediaWrapper: {
    width: 115,
  },
  cardMedia: {
    width: '100%',
    paddingTop: '56.25%',
  },
  cardContent: {
    padding: '0 13px !important'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    // lineHeight: 1.3,
    fontWeight: 500,
  },
  address: {
    fontSize: 12,
    // lineHeight: 1.3,
  },
})

class CamItem extends Component {
  render() {
    const { classes, cam } = this.props
    return (
      <Card className={classes.root}>
        <div className={classes.left}>
          <Checkbox color="primary" />
        </div>
        <div className={classes.right}>
          <div className={classes.cardMediaWrapper}>
            <CardMedia className={classes.cardMedia} image={cam.thumnail} />
          </div>
          <div className={classes.details}>
            <CardContent className={classes.cardContent}>
              <Typography variant="inherit" noWrap className={classes.name}>
                {cam.name}
              </Typography>
              <Typography variant="inherit" noWrap className={classes.address}>
                {cam.address}
              </Typography>
            </CardContent>
          </div>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(CamItem)
