import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Select,
  MenuItem,
  Button,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
} from '@material-ui/core'

const styles = (theme) => ({
  root: {
    // fontSize: 18,
    // color: 'white',
    // fontWeight: 'bold',
    // width: 30,
    // height: 24,
    // paddingTop: 6,
    // paddingRight: '8px !important',
    // paddingBottom: 6,
    // paddingLeft: 8,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    bottom: 0,
  },
  menuItemActive: {
    backgroundColor: '#e0e0e0'
  },
})
class Rate extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      rate: 1,
    }
  }
  handleClickAway = () => {
    this.setState({ open: false })
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    })
  }
  handleChange = (event) => {
    console.log(event.target.value)
    const { actions } = this.props
    actions.changeRate(event.target.value)
  }

  handleRateChange = (rate) => {
    const { actions } = this.props
    actions.changeRate(rate)
  }

  handleMenuItemClick = (rate) => (event) => {
    this.setState({ open: false })
    this.handleRateChange(rate)
  }

  render_backup() {
    const { rates, classes, player } = this.props
    return (
      <div>
        <Select
          disableUnderline
          classes={{
            root: classes.root,
          }}
          IconComponent={() => ''}
          value={player.playbackRate}
          onChange={this.handleChange}
          MenuProps={{
            disablePortal: true,
            // anchorOrigin: {
            //   vertical: 'bottom',
            //   horizontal: 'center',
            // },
            // transformOrigin: {
            //   vertical: 'bottom',
            //   horizontal: 'center',
            // },
            getContentAnchorEl: null,
          }}
        >
          {rates.map((rate, index) => (
            <MenuItem key={index} value={rate}>
              {`${rate}x`}
            </MenuItem>
          ))}
        </Select>
      </div>
    )
  }

  render() {
    const { classes, rates, player } = this.props
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className={classes.root}>
          <Button
            className="video-centic-control-button control-button"
            style={{ fontWeight: 600 }}
            onClick={this.handleClick}
          >
            {`${player.playbackRate}X`}
          </Button>
          {this.state.open ? (
            <div className={classes.dropdown}>
              <Paper className={classes.paper}>
                <List>
                  {rates.map((rate, index) => (
                    <MenuItem
                      key={index}
                      className={classNames({
                        [classes.menuItemActive]: player.playbackRate == rate,
                      })}
                      onClick={this.handleMenuItemClick(rate)}
                    >{`${rate}X`}</MenuItem>
                  ))}
                </List>
              </Paper>
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    )
  }
}

Rate.display = 'Rate'
Rate.defaultProps = {
  rates: [3, 2.5, 2, 1.5, 1, 0.5],
}

export default withStyles(styles)(Rate)
