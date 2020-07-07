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

  componentDidUpdate(){
    this.createXAxis()
    this.createYAxis()
  }

  createXAxis() {
    const { scaleX0, unit } = this.props
    // let tickValue = d3.timeMinute.every(1)
    const xAxis = d3.axisBottom(scaleX0).tickFormat(d3.timeFormat('%d-%m-%Y %H:%M'))
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
