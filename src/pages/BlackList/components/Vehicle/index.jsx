import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Tooltip, Card, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import TooltipWrapper from 'components/TooltipWrapper'
import {
  showEditVehicleBlackList,
  showDeleteVehicleModal,
} from 'actions/action_modal'
import { getCurrentVehicleId } from 'actions/action_blackList'

import styles from './styles'


class Vehicle extends Component {
  handleEditClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.showEditVehicleBlackList()
    this.props.getCurrentVehicleId(this.props.data.id)
  }

  handleDeleteClick = event => {
    event.preventDefault()
    event.stopPropagation()
    this.props.showDeleteVehicleModal(this.props.data)
  }

  render() {
    const { classes, data, match } = this.props
    return (
      <div className={classes.root}>
        <NavLink
          to={`${match.url}/${data.plate}`}
          activeClassName={classes.active}
        >
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography noWrap className={classes.plate}>
                {data.plate}
              </Typography>
              <Typography noWrap className={classes.desc}>
                {data.desc}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Tooltip arrow title="Sửa">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleEditClick}
                >
                  <EditIcon className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="Xóa">
                <IconButton
                  className={classes.iconButton}
                  onClick={this.handleDeleteClick}
                >
                  <DeleteIcon className={classes.smallIcon} />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </NavLink>
      </div>
    )
  }
}

export default withRouter(
  connect(
    null,
    { showEditVehicleBlackList, getCurrentVehicleId, showDeleteVehicleModal },
  )(withStyles(styles)(Vehicle)),
)
