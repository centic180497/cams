import React from 'react'

import { formatTime } from '../../utils'

export default class CurrentTimeDisplay extends React.Component {
  render (){
    const { player: {currentTime, duration} } = this.props
    const formattedTime = formatTime(currentTime, duration)
    return (
      <div>

      </div>
    )
  }
}

CurrentTimeDisplay.display = 'CurrentTimeDisplay'