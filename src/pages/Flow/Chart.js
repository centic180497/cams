import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import * as d3 from 'd3'
import _ from 'lodash'
import Loading from 'components/Loading'
import WithSize from './WithSize'
import Axis from './Axis'
import Tooltip from './ChartTooltip'
import { fetchFlowChartData } from 'actions/action_flow'
import './chart.scss'
const MARGINS = { top: 20, right: 30, bottom: 50, left: 40 }

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  tooltip: {
    
  }
})

class Chart extends Component {
  constructor() {
    super()
    this.svg = React.createRef()
    this.tooltip = React.createRef()
    this.axisXRef = React.createRef()
    this.axisYRef = React.createRef()

    this.state = {
      hoveredBar: null,
      _10d: false,
      _7d: false,
      _4d: false,
      _3d: false,
      _2d: false,
      _1d: false,
      _12h: false,
      _6h: false,
      _3h: false,
      // data: [],
      // colors: d3
      //   .scaleOrdinal()
      //   .range(['#154360', '#CA6F1E', 'red', '#28B463'])
      //   .domain(['bike', 'car', 'truck', 'minibus']),
      scaleX: d3.scaleTime(),
      scaleY: d3.scaleLinear(),
    }
  }

  componentDidMount() {
    const { match, filter } = this.props
    this.props.fetchFlowChartData({ camId: match.params.camId, filter })
    this.setState({
      colors: d3
        .scaleOrdinal()
        .range(['#154360', '#CA6F1E', 'red', '#28B463'])
        .domain(['bike', 'car', 'truck', 'minibus']),
      scaleX: this.createScaleX(),
      scaleY: this.createScaleY(),
    })
    this.interacte()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      console.log('update scale')
      this.setState({
        scaleX: this.createScaleX(),
        scaleY: this.createScaleY(),
      })
      // this.interacte()
    }
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({
        scaleY: this.createScaleY(),
      })
    }
    this.interacte()
  }

  createScaleX() {
    const { data, filter } = this.props
    const minTime = new Date(filter.startTime).getTime()
    // const minTime = new Date("2019-10-25T02:02:32.474Z").getTime()
    const maxTime = new Date(filter.endTime).getTime()
    // const maxTime = new Date("2019-11-25T02:02:32.475Z").getTime()
    const width = this.props.width - MARGINS.left - MARGINS.right
    return d3
      .scaleTime()
      .domain([minTime, maxTime])
      .range([0, width])
  }

  createScaleY() {
    // console.log('create scale X')
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
      .nice()
  }

  interacte() {
    const width = this.props.width - MARGINS.right - MARGINS.left
    const height = this.props.height - MARGINS.top - MARGINS.bottom
    const zoom = d3
      .zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([
        [0, MARGINS.left],
        [this.props.width - MARGINS.right, this.props.height - MARGINS.top],
      ])
      .extent([
        [0, MARGINS.left],
        [width, height],
      ])
      .on('zoom', this.zoomed)
    d3.select(this.svg.current).call(zoom)
    // .transition()
    // .duration(1000)
    // .call(zoom.transform, d3.zoomIdentity.scale())
  }

  zoomEnd = () => {}

  zoomed = () => {
    if (d3.event.sourceEvent && d3.event.sourceEvent.type === 'brush') return // ignore zoom-by-brush
    const t = d3.event.transform
    // console.log(d3.event.sourceEvent.wheelDelta)
    let direction
    if (d3.event.sourceEvent.wheelDelta < 0) {
      direction = 'up'
    } else if (d3.event.sourceEvent.wheelDelta > 0) {
      direction = 'down'
    } else if (d3.event.sourceEvent.wheelDelta === undefined) {
      direction = 'slide'
    }
    console.log(direction)

    const endTime = t.rescaleX(this.createScaleX()).domain()[1]
    const startTime = t.rescaleX(this.createScaleX()).domain()[0]
    const diff = (endTime - startTime) / 1000 / 60 / 60
    const diffDay = (endTime - startTime) / 1000 / 60 / 60 / 24
    console.log(d3.event.transform.k)
    console.log(`Hour: ${diff}, day: ${diff / 24}`)
    const k = d3.event.transform.k

    if (diffDay > 6 && diffDay < 7 && direction === 'down') {
      console.log('fetch chart data')
      this.props.fetchFlowChartData({
        camId: '5ce5f29f53814546473f42e0',
        filter: { startTime, endTime },
      })
    }

    if (diffDay > 3 && diffDay < 3.3 && direction === 'down') {
      this.props.fetchFlowChartData({
        camId: '5ce5f29f53814546473f42e0',
        filter: { startTime, endTime },
      })
    }

    if (diffDay > 9 && diffDay < 10 && direction === 'down') {
      this.props.fetchFlowChartData({
        camId: '5ce5f29f53814546473f42e0',
        filter: { startTime, endTime },
      })
    }

    // console.log(`Domain: [ ${t.rescaleX(this.createScaleX()).domain()} ]`)
    this.setState({
      scaleX: this.createScaleX().domain(t.rescaleX(this.createScaleX()).domain()),
    })
  }

  brushed = () => {}

  renderStacks = stack => {
    const { timeType } = this.props
    const { colors, scaleX, scaleY } = this.state
    const width = this.props.width - MARGINS.left - MARGINS.right
    let padding = 16 * 60 * 60 * 1000
    if (timeType === 'day') {
      padding = 12 * 60 * 60 * 1000
    } else if (timeType === '12h') {
      padding = 6 * 60 * 60 * 1000
    } else if (timeType === '1m') {
      padding = 40 * 1000
    } else if (timeType === '15m') {
      padding = 6 * 60 * 1000
    } else if (timeType === '30m') {
      padding = 15 * 60 * 1000
    } else if (timeType === '1h') {
      padding = 30 * 60 * 1000
    } else if (timeType === '6h') {
      padding = 3 * 60 * 60 * 1000
    }
    // return <Loading size={26} />
    if (!scaleX || !scaleY || !colors) {
      return <Loading size={26} />
    }

    return (
      <g key={stack.key} fill={colors(stack.key)}>
        {stack.map(d => {
          const height = scaleY(d[0]) - scaleY(d[1])
          return (
            <rect
              key={d.data.timestamp}
              x={scaleX(d.data.timestamp - padding / 2)}
              // x={scaleX(d.data.timestamp)}
              y={scaleY(d[1]) || 0}
              pointerEvents="all"
              width={scaleX(d.data.timestamp + padding) - scaleX(d.data.timestamp)}
              // width={30}
              height={height || 0}
              onMouseOver={event => this.handleMouseOver(d.data, event)}
              onMouseOut={event => this.handleMouseLeave(event)}
            ></rect>
          )
        })}
      </g>
    )
  }

  handleMouseOver = (data, event) => {
    // console.log('mouse over')
    // this.setState({
    //   hoveredBar: data,
    // })
  }

  handleMouseLeave = () => {
    // console.log('mouse out')
    // this.setState({
    //   hoveredBar: null,
    // })
  }

  render() {
    const { classes, width, height, vehicleType = [], data = [] } = this.props
    const { scaleX, scaleY } = this.state
    // console.log('rendered')
    if (!scaleX || !scaleY || _.isEmpty(data)) {
      console.log('a his his')
      return <Loading size={26} />
    }
    const series = d3.stack().keys(vehicleType)(data)
    const open = Boolean(this.state.hoveredBar)
    return (
      <div className={classes.root}>
        <svg width={width} height={height} ref={this.svg}>
          <g transform={`translate(${MARGINS.left}, ${MARGINS.top})`}>
            <Axis scaleX={scaleX} scaleY={scaleY} />
            {/* <g className="axis">
              <g ref={this.axisXRef} transform={`translate(0, ${scaleY.range()[0]})`} />
              <g ref={this.axisYRef} />
            </g> */}
          </g>
          <g transform={`translate(${MARGINS.left}, ${MARGINS.top})`}>
            {series.map(this.renderStacks)}
          </g>
        </svg>
        <div className={classes.tooltip}></div>
      </div>
    )
  }
}
const mapStateToProps = ({ flow }) => {
  return {
    filter: flow.filter,
    vehicleType: flow.vehicleType,
    timeType: flow.chart.type,
    data: flow.detail,
  }
}
export default withRouter(
  connect(mapStateToProps, { fetchFlowChartData })(WithSize(withStyles(styles)(Chart))),
)
