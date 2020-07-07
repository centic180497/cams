import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Loading from 'components/Loading'
import Filter from './Filter'
import FlowChart from './FlowChart'
import WaitLineChart from './WaitLineChart'
import LightPeriodChart from './LightPeriodChart'
import {
  filterLightPeriodChartData,
} from 'actions/action_lightPeriodChart'
import { Typography } from '@material-ui/core'
const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  filter: {
    // flexGrow: 1,
    // flexShrink: 1
  },
  chart: {
    height: 'calc(100% - 60px)',
  },
  input: {
    display: 'flex',
    flexDirection: 'row',
    height: '33%',
  },
  output: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '33.333%',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
})

class LightPeriod extends Component {
  componentDidMount() {
    this.props.filterLightPeriodChartData({
      time: new Date().toString(),
    })
  }
  render() {
    const { classes, isFetchingChartData } = this.props

    return (
      <div className={classes.root}>
        <div className={classes.filter}>
          <Filter />
        </div>
        <div className={classes.chart}>
          {isFetchingChartData ? (
            <Loading />
          ) : (
            <Fragment>
              <div className={classes.output}>
                <FlowChart />
                <Typography align="center">Biểu đồ lưu lượng (xe)</Typography>
              </div>
              <div className={classes.output}>
                <WaitLineChart />
                <Typography align="center">Biểu đồ  dòng chờ (m)</Typography>
              </div>
              <div className={classes.output}>
                <LightPeriodChart />
                <Typography align="center">Biểu đồ chu kỳ đèn</Typography>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ lightPeriod }) => {
  return {
    isFetchingChartData: lightPeriod.api.isFetchingChartData,
  }
}
export default connect(mapStateToProps, { filterLightPeriodChartData })(
  withStyles(styles)(LightPeriod),
)
