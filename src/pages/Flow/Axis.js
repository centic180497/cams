import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'

class Axis extends Component {
  static displayName = 'Axis'
  constructor(props) {
    super(props)
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
    // console.log(this.props.scaleX.domain())
    // console.log(this.props.scaleX.ticks())
    const xAxis = d3.axisTop(this.props.scaleX)
    // .ticks(d3.timeMinute.every(120))
    // .tickSize(this.props.scaleY.range()[0])
    // .tickFormat(d3.timeFormat('%H:%M'))
    // .tickFormat(d3.timeFormat("%H:%M"))
    d3.select(this.axisXRef.current).call(g => {
      // console.log(g)
      g.call(xAxis)
      g.selectAll('.tick text')
        .attr('y', 20)
        .classed('chart-axis__label', true)
        .classed('chart-axis__label--x', true)
        .attr('transform', 'rotate(-45)')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
      g.selectAll('.tick line')
        .attr('y1', 5)
        .classed('chart-axis__axis', true)
      g.selectAll('.domain').classed('chart-axis__axis', true)
    })
  }

  createYAxis() {
    // only get integer label tick
    const yAxisTicks = this.props.scaleY.ticks().filter(tick => Number.isInteger(tick))
    const yAxis = d3
      .axisRight(this.props.scaleY)
      .tickSize(this.props.scaleX.range()[1])
      .tickValues(yAxisTicks)
      .tickFormat(d => {
        if (Number.isInteger(d)) return d
      })

    d3.select(this.axisYRef.current).call(g => {
      g.call(yAxis)
      g.selectAll('.tick line')
        .attr('x1', -5)
        .classed('chart-axis__axis', true)

      g.selectAll('.tick text')
        .attr('x', -10)
        .classed('chart-axis__label', true)

      g.selectAll('.domain').classed('chart-axis__axis', true)
    })
  }

  render() {
    const { scaleY, scaleX } = this.props
    return (
      <g className="axis">
        <g ref={this.axisXRef} transform={`translate(0, ${scaleY.range()[0]})`} />
        {/* <g ref={this.axisXRef} /> */}
        <g ref={this.axisYRef} />
      </g>
    )
  }
}

const mapStateToProps = ({ flow }) => ({
  filter: flow.chart,
})

export default connect(mapStateToProps)(Axis)
