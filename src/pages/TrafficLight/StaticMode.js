import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { red, green, yellow } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns'
import { InlineTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import viLocale from 'date-fns/locale/vi'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: 48,
    paddingRight: 48,
  },
  left: {
    width: '50%',
    paddingTop: 16,
    paddingLeft: 20,
    borderRight: `1px solid #ccc`,
  },
  right: {
    width: '50%',
    paddingTop: 16,
    paddingLeft: 20,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    marginTop: 16,
    fontWeight: 400,
  },
  lightPeriod: {
    display: 'flex',
    flexDirection: 'row',
  },
  yellowBlink: {
    display: 'flex',
    // flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16
  },
  formGroup: {
    marginBottom: 8,
    marginRight: 8,
  },
  textField: {
    // width: 150
  },
  inputAdornment: {},
  inputProps: {
    width: 100,
    textAlign: 'center',
  },
  iconButton: {
    padding: 8,
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelText: {
    display: 'flex',
    alignItems: 'center',
  },
  light: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    marginRight: 4,
  },
  redLight: {
    background: red[900],
  },
  greenLight: {
    background: green[800],
  },
  yellowLight: {
    background: yellow[800],
  },

  colorSwitchBase: {
    // color
  },
  phaseName: {
    marginBottom: 16,
    fontSize: 16,
  },
})

class StaticMode extends Component {
  handleClick = () => {}

  handlePickerChange = () => {}
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Typography className={classes.title}>Chu kỳ đèn</Typography>
        <div className={classes.lightPeriod}>
          <div className={classes.left}>
            <Typography className={classes.phaseName}>Huỳnh Ngọc Huệ</Typography>
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.redLight)}></div>
                      <div className={classes.labelText}>Đèn đỏ</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start" className={classes.inputAdornment}>
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.greenLight)}></div>
                      <div className={classes.labelText}>Đèn xanh</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.yellowLight)}></div>
                      <div className={classes.labelText}>Đèn vàng</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <Typography className={classes.phaseName}>Hà Huy Tập</Typography>
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.redLight)}></div>
                      <div className={classes.labelText}>Đèn đỏ</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start" className={classes.inputAdornment}>
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.greenLight)}></div>
                      <div className={classes.labelText}>Đèn xanh</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.yellowLight)}></div>
                      <div className={classes.labelText}>Đèn vàng</div>
                    </div>
                  }
                  variant="outlined"
                  type="number"
                  className={classes.textField}
                  InputProps={{
                    inputProps: {
                      min: '0',
                      max: '9999',
                      className: classes.inputProps,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Remove />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton className={classes.iconButton} onClick={this.handleClick()}>
                          <Add />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // value={20}
                />
              </div>
            </div>
          </div>
        </div>
        <Typography className={classes.title}>Đèn vàng nhấp nháy</Typography>
        <div className={classes.yellowBlink}>
            <FormControl>
              <FormGroup>
                <FormControlLabel control={<Switch color="primary" />} label="Bật" />
              </FormGroup>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
              <div className={classes.formGroup}>
                <InlineTimePicker
                  ampm={false}
                  label="Bắt đầu"
                  variant="outlined"
                  format="HH:mm"
                  onChange={this.handlePickerChange}
                />
              </div>
              <div className={classes.formGroup}>
                <InlineTimePicker
                  ampm={false}
                  label="Kết thúc"
                  variant="outlined"
                  format="HH:mm"
                  onChange={this.handlePickerChange}
                />
              </div>
            </MuiPickersUtilsProvider>
          
        </div>
      </div>
    )
  }
}

export default connect()(withStyles(styles)(StaticMode))
