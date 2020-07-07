import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import './chart.scss'
import WithSize from './WithSize'
import Axis from './Axis'
import Loading from 'components/Loading'
import { Typography } from '@material-ui/core'
// import data from './data1'

const styles = theme => ({
  root: {
    position: 'relative',
  },
})

const MARGINS = { top: 30, right: 30, bottom: 30, left: 70 }

class WaitingPeriodChart extends Component {
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
        .range([
          '#98abc5',
          '#8a89a6',
          '#7b6888',
          '#6b486b',
          '#a05d56',
          '#d0743c',
          '#ff8c00',
        ]),
    }
  }

  componentDidMount() {
    const scaleX0 = this.createScaleX0()
    const scaleX1 = this.createScaleX1(scaleX0)
    const scaleY = this.createScaleY()
    this.setState(
      {
        // the scale spacing the groups
        scaleX0,
        // the scale for spacing each group's bar
        scaleX1,
        scaleY,
      },
    )
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      JSON.stringify(prevProps.flows) !== JSON.stringify(this.props.flows)
    ) {
      const scaleX0 = this.createScaleX0()
      const scaleX1 = this.createScaleX1(scaleX0)
      const scaleY = this.createScaleY()
      this.setState({ scaleX0, scaleX1, scaleY })
    }
  }

  createScaleX0() {
    const width = this.props.width - MARGINS.left - MARGINS.right
    const data = this.props.flows
    return d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1)
      .domain(
        data.map(function(d) {
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
    const data = this.props.flows
    const keys = ['Hà Huy Tập', 'Huỳnh Ngọc Huệ']
    return d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        0,
        d3.max(data, d => {
          return d3.max(keys, key => {
            return d[key]
          })
        }),
      ])
  }

  renderGroups() {
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    const { flows = [] } = this.props
    const keys = ['Hà Huy Tập', 'Huỳnh Ngọc Huệ']
    const { scaleX0, scaleX1, scaleY, color } = this.state
    return flows.map((flow, index1) => {
      const rectangles = keys.map(key => ({ key: key, value: flow[key] }))
      return (
        <g
          key={index1}
          className="bar"
          transform={`translate(${scaleX0(new Date(flow.time)) || 0},0)`}
        >
          {rectangles.map((rectangle, index2) => {
            return (
              <rect
                key={index2}
                x={scaleX1(rectangle.key) || 0}
                y={scaleY(rectangle.value) || 0}
                width={scaleX1.bandwidth() || 0}
                height={height - scaleY(rectangle.value) || 0}
                fill={color(rectangle.key)}
              />
            )
          })}
        </g>
      )
    })
  }

  render() {
    const { classes, isFetchingChartData } = this.props
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
            <g>{this.renderGroups()}</g>
          </g>
        </svg>
        
      </div>
    )
  }
}
const mapStateToProps = ({ lightPeriod }) => {
  return {
    flows: lightPeriod.data.flows,
    isFetchingChartData: lightPeriod.api.isFetchingChartData,
  }
}

export default connect(mapStateToProps)(WithSize(withStyles(styles)(WaitingPeriodChart)))
