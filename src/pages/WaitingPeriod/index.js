import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Loading from 'components/Loading'
import Filter from './Filter'
import WaitingPeriodChart from './WaitingPeriodChart'
import {
  filterLightPeriodChartData,
} from 'actions/action_lightPeriodChart'
import { Typography } from '@material-ui/core'

import { Player } from 'components/player_mp4'
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
    height: 'calc(100% - 50px)',
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
    height: '100%',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  title: {
    height: 40
  }
})

class WaitingPeriod extends Component {
  componentDidMount() {
    this.props.filterLightPeriodChartData({
      time: new Date().toString(),
    })
  }
  render() {
    const { classes, isFetchingChartData } = this.props

    return (
      <div className={classes.root}>
        {/* <div className={classes.filter}>
          <Filter />
        </div>
        <div className={classes.chart}>
          {isFetchingChartData ? (
            <Loading />
          ) : (
            <Fragment>
              <div className={classes.output}>
                <WaitingPeriodChart />
                <Typography align="center" className={classes.title}>Biểu đồ  thời gian chờ trung bình(s)</Typography>
              </div>
            </Fragment>
          )}
        </div> */}
          <Player src="/video.mp4"></Player>

        {/* <video src="http://localhost:3000/video.mp4"></video> */}
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
  withStyles(styles)(WaitingPeriod),
)
