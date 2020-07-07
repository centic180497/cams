import React from 'react'
import { CircularProgress } from '@material-ui/core'

export default function LoadingSpinner({ player, className }) {
  if (player.error) return null

  return (
    <div className="video-centic-loading-spinner">
      <CircularProgress style={{ width: 60, height: 60, color: '#fff' }} />
    </div>
  )
}

LoadingSpinner.displayName = 'LoadingSpinner'
