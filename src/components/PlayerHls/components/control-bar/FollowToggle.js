import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import TooltipWrapper from '../../../TooltipWrapper'

const styles = theme => ({
  root: {},
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
  },
  icon: {
    color: theme.palette.common.white,
  },
})

class FollowToggle extends Component {
  render() {
    const { classes } = this.props
    return (
      <TooltipWrapper placement="top" title="Bỏ theo dõi">
        <button className="control-button">
          {true ? (
            <Visibility className="control-button__icon"/>
          ) : (
            <VisibilityOff className="control-button__icon"/>
          )}
        </button>
      </TooltipWrapper>
    )
  }
}

export default FollowToggle
