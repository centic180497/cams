import React from 'react'
import { Tooltip, Slider } from '@material-ui/core'
import { formatTime } from '../../utils'

function ValueLabelComponent(props) {
  const { children, open, value } = props

  return (
    <Tooltip
      arrow
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={value}
      PopperProps={{
        disablePortal: true,
      }}
    >
      {children}
    </Tooltip>
  )
}

export default class ProgressControl extends React.Component {
  constructor(props) {
    super(props)
    props.manager.subscribeToPlayerStateChange(
      this.handleStateChange.bind(this),
    )
    this.state = {
      value: 0,
    }
  }

  handleStateChange = (state, prevState) => {}

  handleChange = (event, newTime) => {
    const { player, actions } = this.props
    actions.handleSeekingTime(newTime)
  }

  handleChangeCommitted = (event, newTime) => {
    const { actions } = this.props
    actions.seek(newTime)
    actions.handleEndSeeking(newTime)
    
  }

  render() {
    const {
      player: { currentTime, seekingTime, duration },
    } = this.props
    const time = seekingTime || currentTime
    // console.log('seekingTime: ' +  seekingTime + ' currentTime: ', currentTime);
    const valueFormattedTime = formatTime(time, duration)
    return (
      <div className="video-centic-progress-control">
        <Slider
          min={0}
          max={duration}
          aria-label="custom thumb label"
          ValueLabelComponent={ValueLabelComponent}
          // value={currentTime}
          value={time}
          // valueLabelFormat={currentFormattedTime}
          valueLabelFormat={valueFormattedTime}
          onChange={this.handleChange}
          onChangeCommitted={this.handleChangeCommitted}
        />
      </div>
    )
  }
}

ProgressControl.display = 'ProgressControl'
