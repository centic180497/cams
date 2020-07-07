import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'

class Axis extends Component {
  constructor() {
    super()
    this.axisXRef = React.createRef()
    this.axisYRef = React.createRef()
  }

  componentDidMount() {
    this.createXAxis()
    this.createYAxis()
  }

  componentDidUpdate() {
    this.createXAxis()
    this.createYAxis()
  }

  createXAxis() {
    const { scaleX, unit } = this.props
    let tickValue = d3.timeDay.every(1)
    let tickFormat = d3.timeFormat('%H:%M')
    if (unit === '1m') {
      tickValue = d3.timeMinute.every(1)
    } else if (unit === '5m') {
      tickValue = d3.timeMinute.every(5)
    } else if (unit === '10m') {
      tickValue = d3.timeMinute.every(10)
    } else if (unit === '15m') {
      tickValue = d3.timeMinute.every(15)
    } else if (unit === '30m') {
      tickValue = d3.timeMinute.every(30)
    } else if (unit === '1h') {
      tickValue = d3.timeHour.every(1)
    } else if (unit === '1d') {
      tickValue = d3.timeDay.every(1)
      tickFormat = d3.timeFormat('%d-%m')
    }

    const xAxis = d3
      .axisBottom(scaleX)
      .ticks(tickValue)
      .tickFormat(tickFormat)
    d3.select(this.axisXRef.current).call(xAxis)
  }

  createYAxis() {
    const { scaleY, width } = this.props
    const yAxis = d3.axisLeft(scaleY)
    d3.select(this.axisYRef.current).call(yAxis)
  }

  render() {
    const { height } = this.props
    return (
      <Fragment>
        <g
          ref={this.axisXRef}
          className="axis axis--x"
          transform={`translate(0, ${height})`}
        />
        <g ref={this.axisYRef} className="axis axis--y" />
      </Fragment>
    )
  }
}

export default Axis
