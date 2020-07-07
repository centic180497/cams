import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'

import { toggleDrawer } from '../../actions/action_ui'

import styles from './styles'

class RightDrawer extends Component {
  componentDidMount() {
    console.log('hihi')
  }
  render() {
    const { classes, open, toggleDrawer } = this.props
    return (
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <div className={classes.root}>
          <div className={classes.header}>
            <Typography noWrap className={classes.title}>THÔNG BÁO</Typography>
          </div>
        </div>
      </Drawer>
    )
  }
}

const mapStateToProps = ({ ui }) => ({
  open: ui.drawer,
})

export default connect(
  mapStateToProps,
  {
    toggleDrawer: toggleDrawer,
  },
)(withStyles(styles)(RightDrawer))
