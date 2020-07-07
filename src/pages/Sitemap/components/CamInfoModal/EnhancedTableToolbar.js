import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, IconButton, Popover } from '@material-ui/core'
import { indigo } from '@material-ui/core/colors'
import { TuneOutlined, Delete as DeleteIcon } from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import ArrowTooltip from 'components/TooltipWrapper'

const styles = theme => ({
  root: {},
  hightlight: {
    color: indigo[900],
    backgroundColor: indigo[100],
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {},
  icon: {
    fontSize: 20,
  },
  picker: {
    padding: 20,
    width: 400,
    // height: 600
  },
  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(19px, 14px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '2.5px 0 2.5px 6px',
  },
})

class EnhancedTableToolbar extends Component {
  state = {
    anchorEl: null,
    day: null,
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  handlePickerChange = date => {
    this.setState({
      day: date,
    })
  }

  render() {
    const { classes, selected = [] } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.hightlight]: selected.length > 0,
        })}
      >
        <div>
          {selected.length > 0 ? (
            <Typography noWrap className={classes.title} color="inherit">
              {selected.length} video
            </Typography>
          ) : (
            <Typography noWrap>Danh sách videos</Typography>
          )}
        </div>
        <div className={classes.spacer}></div>
        <div className={classes.actions}>
          {selected.length > 0 ? (
            <Fragment>
              <ArrowTooltip title="Xóa">
                <IconButton className={classes.iconButton}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              </ArrowTooltip>
            </Fragment>
          ) : (
            <Fragment>
              <ArrowTooltip title="Lọc">
                <IconButton onClick={this.handleClick}>
                  <TuneOutlined className={classes.icon} />
                </IconButton>
              </ArrowTooltip>
              <Popover
                id="simple-popper"
                anchorEl={anchorEl}
                open={open}
                disablePortal
                onClose={this.handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <div className={classes.picker}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <InlineDatePicker
                      fullWidth
                      label="Ngày"
                      name="day"
                      variant="outlined"
                      format="dd/MM/yyyy"
                      InputLabelProps={{
                        classes: {
                          root: classes.inputLabel,
                        },
                      }}
                      InputProps={{
                        inputProps: {
                          className: classes.inputProps,
                        },
                      }}
                      value={this.state.day}
                      onChange={this.handlePickerChange}
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </Popover>
            </Fragment>
          )}
        </div>
      </Toolbar>
    )
  }
}

const mapStateToProps = ({ recordVideos }) => {
  return {
    selected: recordVideos.selected,
  }
}
export default connect(mapStateToProps)(withStyles(styles)(EnhancedTableToolbar))
