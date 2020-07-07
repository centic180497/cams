import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import './chart.scss'
import WithSize from './WithSize'
import { red, green, yellow } from '@material-ui/core/colors'
import Axis from './Axis'

const styles = theme => ({
  root: {
    position: 'relative',
  },
})

const MARGINS = { top: 10, right: 30, bottom: 20, left: 70 }

class LightPeriodChart extends Component {
  constructor() {
    super()
    this.focus = React.createRef()
    this.svg = React.createRef()
    this.state = {
      scaleX0: d3.scaleBand(),
      scaleX1: d3.scaleBand(),
      scaleY: d3.scaleLinear(),
      color: d3
        .scaleOrdinal()
        .range([red[900], yellow[800], green[800]])
        .domain(['red', 'yellow', 'green']),
    }
  }

  componentDidMount() {
    const scaleX0 = this.createScaleX0()
    const scaleX1 = this.createScaleX1(scaleX0)
    const scaleY = this.createScaleY()
    this.setState({
      // the scale spacing the groups
      scaleX0,
      // the scale for spacing each group's bar
      scaleX1,
      scaleY,
    })
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      JSON.stringify(prevProps.dataTest) !== JSON.stringify(this.props.dataTest)
    ) {
      const scaleX0 = this.createScaleX0()
      const scaleX1 = this.createScaleX1(scaleX0)
      const scaleY = this.createScaleY()
      this.setState({
        scaleX0,
        scaleX1,
        scaleY,
      })
    }
  }

  createScaleX0() {
    // create scale X
    const width = this.props.width - MARGINS.left - MARGINS.right
    const { periods } = this.props
    return d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(
        periods.map(function(d) {
          return new Date(d.time)
        }),
      )
  }

  createScaleX1(scaleX0) {
    const keys = ['Hà Huy Tập', 'Huỳnh Ngọc Huệ']
    return d3
      .scaleBand()
      .padding(0.05)
      .domain(keys)
      .rangeRound([0, scaleX0.bandwidth()])
  }

  createScaleY() {
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    const keys = ['Hà Huy Tập', 'Huỳnh Ngọc Huệ']
    const { periods } = this.props
    return d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(periods, d => {
          return d3.max(keys, key => {
            return d[key]['green'] + d[key]['yellow'] + d[key]['red']
          })
        }),
      ])
  }

  renderBarStacks() {
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    const { scaleX0, scaleX1, scaleY, color } = this.state
    const { periods = [] } = this.props
    const keys = ['Hà Huy Tập', 'Huỳnh Ngọc Huệ']
    let groupData = []
    periods.map(period => {
      let rollup = {}
      keys.map(key => {
        rollup = { time: period.time }
        rollup.phase = key
        rollup.green = period[key]['green']
        rollup.yellow = period[key]['yellow']
        rollup.red = period[key]['red']
        groupData.push(rollup)
      })
    })

    const stackData = d3.stack().keys(['red', 'yellow', 'green'])(groupData)
    return stackData.map((stack, index1) => {
      return (
        <g key={index1} className="serie" fill={color(stack.key)}>
          {stack.map((d, index2) => {
            return (
              <rect
                key={index2}
                transform={`translate(${scaleX0(new Date(d.data.time)) || 0}, 0)`}
                x={scaleX1(d.data.phase)}
                y={scaleY(d[1])}
                width={scaleX1.bandwidth()}
                height={
                  scaleY(d[0]) - scaleY(d[1]) > 0
                    ? scaleY(d[0]) - scaleY(d[1])
                    : 0
                }
              />
            )
          })}
        </g>
      )
    })
  }

  render() {
    const { classes } = this.props
    const { scaleX0, scaleX1, scaleY } = this.state
    const width = this.props.width - MARGINS.left - MARGINS.right
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    return (
      <div className={classes.root}>
        <svg ref={this.svg} width={this.props.width} height={this.props.height}>
          <g
            ref={this.focus}
            className="focus"
            transform={`translate(${MARGINS.left}, ${MARGINS.top})`}
          >
            <Axis
              scaleX0={scaleX0}
              scaleX1={scaleX1}
              scaleY={scaleY}
              width={width}
              height={height}
            />
            {this.renderBarStacks()}
          </g>
        </svg>
        {/* <Typography align="center">Biểu đồ chu kỳ đèn</Typography> */}
      </div>
    )
  }
}
const mapStateToProps = ({ lightPeriod }) => {
  return {
    periods: lightPeriod.data.periods,
  }
}
export default connect(mapStateToProps)(
  WithSize(withStyles(styles)(LightPeriodChart)),
)
