import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'
import * as d3 from 'd3'
import { withStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { fetchFlowChartData } from 'actions/action_flow'
import Filter from './Filter'
import VehicleType from './VehicleType'
import Chart from './Chart1'

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    // padding: 8
  },
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

class FlowInfo extends Component {
  render() {
    const { classes, match } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <Filter />
          <Chart camId={match.params.camId} />
          <VehicleType />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ flow }) => {
  // const data = flow.detail.flows.map(item => item)
  return {
    vehicleType: flow.vehicleType,
    filter: flow.filter,
    data: flow.detail,
  }
}

export default withRouter(
  connect(null, {
    fetchFlowChartData,
  })(withStyles(styles)(FlowInfo)),
)
