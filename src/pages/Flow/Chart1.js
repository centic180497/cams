import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import WithSize from './WithSize'
import Axis from './Axis1'
import * as d3 from 'd3'
import Loading from 'components/Loading'
import { fetchFlowChartData } from 'actions/action_flow'
import './chart.scss'
import Tooltip from './ChartTooltip'

const MARGINS = { top: 20, right: 30, bottom: 50, left: 40 }

const styles = theme => ({
  root: {
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
  },
})

class Chart extends Component {
  constructor() {
    super()
    this.svg = React.createRef()
    this.rect = React.createRef()
    this.xAxis = React.createRef()
    this.yAxis = React.createRef()
    this.focus = React.createRef()
    this.state = {
      colors: d3
        .scaleOrdinal()
        .range(['#154360', '#CA6F1E', 'red', '#28B463'])
        .domain(['bike', 'car', 'truck', 'minibus']),
      scaleX: d3.scaleTime(),
      scaleY: d3.scaleLinear(),
    }
  }

  componentDidMount() {
    this.props.fetchFlowChartData({
      camId: this.props.camId,
    })

    this.setState({
      scaleX: this.createScaleX(),
      scaleY: this.createScaleY(),
    })
    // this.hoverTooltip()
    // this.interacte()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height ||
      JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
    ) {
      this.setState({
        scaleX: this.createScaleX(),
        scaleY: this.createScaleY(),
      })
    }
    // this.hoverTooltip()
    // this.interacte()
  }

  hoverTooltip (){
    // console.log(`${d3.event.pageX} ${d3.event.pageY}`)
    d3.select(this.svg.current).on('mouseover', function(){
      // console.log('vietbq')
      // console.log(`${d3.event.pageX} ${d3.event.pageY}`)
    })
  }
  createScaleX() {
    const { filter, data = [], unit } = this.props
    // const minTime = new Date(filter.startTime).getTime()
    // const maxTime = new Date(filter.endTime).getTime()
    const minTime = d3.min(data.map(d => d.timestamp))
    const maxTime = d3.max(data.map(d => d.timestamp))
    const width = this.props.width - MARGINS.left - MARGINS.right
    let padding = 0
    if (unit === '1m') {
      padding = 60 * 1000
    } else if (unit === '5m') {
      padding = 5 * 60 * 1000
    } else if (unit === '10m') {
      padding = 10 * 60 * 1000
    } else if (unit === '15m') {
      padding = 15 * 60 * 1000
    } else if (unit === '30m') {
      padding = 30 * 60 * 1000
    } else if (unit === '1h') {
      padding = 60 * 60 * 1000
    } else if (unit === '1d') {
      padding = 24 * 60 * 60 * 1000
    }
    return d3
      .scaleTime()
      .domain([minTime - padding, maxTime + padding])
      .range([0, width])
  }

  createScaleY() {
    const { vehicleType = [], data = [] } = this.props
    const yValues = data.map(d => {
      let total = 0
      vehicleType.forEach(key => {
        total += d[key]
      })
      return total * 1.1
    })
    return d3
      .scaleLinear()
      .domain([0, d3.max(yValues)])
      .range([this.props.height - MARGINS.top - MARGINS.bottom, 0])
  }

  interacte = () => {
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    const width = this.props.width - MARGINS.left - MARGINS.right
    d3.select(this.focus.current).call(
      d3
        .zoom()
        .translateExtent([
          [0, 0],
          [width, height],
        ])
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([1, Infinity])
        .on('zoom', this.zoomed),
    )
  }

  zoomed = () => {
    const t = d3.event.transform
    this.setState({
      scaleX: this.createScaleX().domain(t.rescaleX(this.createScaleX()).domain()),
    })
  }

  handleMouseOver = (event, data) => {
    const rect = d3.select(this.rect.current)
    d3.select(this.rect.current).on('click', function(){
      
    })
    this.setState({
      hoveredBar: data,
    })
  }

  handleMouseOut = () => {
    this.setState({
      hoveredBar: null,
    })
  }

  render() {
    const { classes, vehicleType = [], data = [], filter, unit } = this.props
    const { scaleX, scaleY } = this.state
    const width = this.props.width - MARGINS.left - MARGINS.right
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    if (!scaleX || !scaleY) {
      return <Loading size={26} />
    }
    console.log(vehicleType, data)
    const series = d3.stack().keys(vehicleType)(data)
    console.log(series)
    
    const open = Boolean(this.state.hoveredBar)
    return (
      <div className={classes.root}>
        <svg ref={this.svg} width={this.props.width} height={this.props.height}>
          <defs>
            <clipPath id="clip">
              <rect width={width} height={height}></rect>
            </clipPath>
          </defs>
          <g
            ref={this.focus}
            className="focus"
            transform={`translate(${MARGINS.left}, ${MARGINS.top})`}
          >
            <Axis scaleX={scaleX} scaleY={scaleY} width={width} height={height} unit={unit} />
            {series.map(this.renderBarStacks)}
          </g>
        </svg>
        {open && <Tooltip data={this.state.hoveredBar} scaleX={scaleX} scaleY={scaleY} />}
      </div>
    )
  }

  renderBarStacks = stack => {
    const { colors, scaleX, scaleY } = this.state
    const { unit } = this.props
    let padding = 0
    if (unit === '1m') {
      padding = 30 * 1000
    } else if (unit === '5m') {
      padding = 2.5 * 60 * 1000
    } else if (unit === '10m') {
      padding = 5 * 60 * 1000
    } else if (unit === '15m') {
      padding = 7.5 * 60 * 1000
    } else if (unit === '30m') {
      padding = 15 * 60 * 1000
    } else if (unit === '1h') {
      padding = 30 * 60 * 1000
    } else if (unit === '1d') {
      padding = 12 * 60 * 60 * 1000
    }
    return (
      <g key={stack.key} fill={colors(stack.key)}>
        {stack.map((d, index) => {
          const height = scaleY(d[0]) - scaleY(d[1])
          const width = scaleX(d.data.timestamp + padding) - scaleX(d.data.timestamp)
          const x = scaleY(d[1]) ? scaleY(d[1]) : 0
          return (
            <rect
              ref={this.rect}
              key={index}
              x={
                scaleX(d.data.timestamp - padding / 2) > 0
                  ? scaleX(d.data.timestamp - padding / 2)
                  : 0
              }
              y={scaleY(d[1]) > 0 ? scaleY(d[1]) : 0}
              width={width > 0 ? width : 0}
              height={height > 0 ? height : 0}
              onMouseOver={event => this.handleMouseOver(event, d.data)}
              onMouseOut={event => this.handleMouseOut(event, d.data)}
            />
          )
        })}
      </g>
    )
  }
}
const mapStateToProps = ({ flow }) => ({
  data: flow.detail,
  filter: flow.filter,
  unit: flow.chart.unit.value,
  vehicleType: flow.type,
})

export default connect(mapStateToProps, { fetchFlowChartData })(WithSize(withStyles(styles)(Chart)))
