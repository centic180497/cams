import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import TooltipWrapper from '../../../../components/TooltipWrapper'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Scrollbars } from 'react-custom-scrollbars'

import { showAddToBlackListModal } from '../../../../actions/action_modal'
import { fetchBlackList } from '../../../../actions/action_blackList'
import Vehicle from '../Vehicle'
import styles from './styles'
import { Tooltip } from '@material-ui/core'

class ListItem extends Component {
  componentDidMount() {
    this.props.fetchBlackList()
  }

  handleAddClick = () => {
    this.props.showAddToBlackListModal()
  }

  render() {
    const { classes, objects = [] } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <div className={classes.listVehicle}>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <div className={classes.wrapper}>
                {objects.map((obj, index) => (
                  <Vehicle data={obj} key={index} />
                ))}
              </div>
            </Scrollbars>
          </div>
          <Tooltip arrow title="Thêm phương tiện" placement="top">
            <Fab
              className={classes.fab}
              onClick={this.handleAddClick}
              color="primary"
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ blackList }) => ({
  objects: blackList.data,
})

export default connect(
  mapStateToProps,
  { showAddToBlackListModal, fetchBlackList },
)(withStyles(styles)(ListItem))
