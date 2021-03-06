import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

function arrowGenerator(color) {
  return {
    opacity: 1,
    '&[x-placement*="bottom"] $arrow': {
      opacity: 1,
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      opacity: 1,
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      opacity: 1,
      left: 0,
      marginLeft: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      opacity: 1,
      right: 0,
      marginRight: '-0.95em',
      height: '3em',
      width: '1em',
      '&::before': {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  }
}

const styles = theme => ({
  arrow: {
    position: 'absolute',
    fontSize: 6,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  // bootstrapPopper: arrowGenerator(theme.palette.common.black),
  bootstrapPopper: arrowGenerator(grey[800]),
  bootstrapTooltip: {
    fontSize: '0.825rem',
    backgroundColor: grey[800],
  },
  bootstrapPlacementLeft: {
    margin: '0 8px',
  },
  bootstrapPlacementRight: {
    margin: '0 8px',
  },
  bootstrapPlacementTop: {
    margin: '8px 0',
  },
  bootstrapPlacementBottom: {
    margin: '8px 0',
  },
})

class TooltipWrapper extends Component {
  state = {
    arrowRef: null,
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    })
  }

  render() {
    const { title, classes, ...other } = this.props
    return (
      <Tooltip
        disableFocusListener
        title={
          <Fragment>
            {title}
            <span className={classes.arrow} ref={this.handleArrowRef} />
          </Fragment>
        }
        classes={{
          tooltip: classes.bootstrapTooltip,
          popper: classes.bootstrapPopper,
          tooltipPlacementLeft: classes.bootstrapPlacementLeft,
          tooltipPlacementRight: classes.bootstrapPlacementRight,
          tooltipPlacementTop: classes.bootstrapPlacementTop,
          tooltipPlacementBottom: classes.bootstrapPlacementBottom,
        }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
        {...other}
      >
        {this.props.children}
      </Tooltip>
    )
  }
}

export default withStyles(styles)(TooltipWrapper)
