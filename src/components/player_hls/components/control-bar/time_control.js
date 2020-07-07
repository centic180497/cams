import React from 'react'

import { formatTime } from '../../utils'

export default class TimeControl extends React.Component {
  render() {
    const {
      player: { currentTime, duration },
    } = this.props
    const currentFormattedTime = formatTime(currentTime, duration)
    const durationFomattedTime = formatTime(duration)
    return (
      <div className="video-centic-time-control">
        {currentFormattedTime}/{durationFomattedTime}
      </div>
    )
  }
}
