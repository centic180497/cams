import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import { red, green, yellow } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns'
import { InlineTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import viLocale from 'date-fns/locale/vi'
import _ from 'lodash'
import { Remove, Add } from '@material-ui/icons'
import { fetchIntelligentConfigViaType } from 'actions/action_trafficControl'
import Loading from 'components/Loading'

const styles = theme => ({
  title: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 400,
  },
  lightPeriod: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20
  },
  yellowBlink: {
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16,
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
  phaseName: {
    marginBottom: 16,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
  },
  formGroup: {
    marginBottom: 8,
    marginRight: 8,
  },
  inputAdornment: {},
  inputProps: {
    width: 100,
    textAlign: 'center',
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
  label: {
    display: 'flex',
    flexDirection: 'row',
  },
  labelText: {
    display: 'flex',
    alignItems: 'center',
  },
  radioGroup: {
    flexDirection: 'row',
    // marginLeft: 20,
  },
})
class PeriodLight extends Component {
  componentDidMount() {
    this.props.fetchIntelligentConfigViaType({ type: 'period' })
  }

  handleSwitchChange = (event, name) => {
    this.props.handleSwitchChange(event, name)
  }

  handleInputChange = event => {
    this.props.handleInputChange(event)
  }

  handleIconButtonClick = (event, name, type) => {
    this.props.handleIconButtonClick(event, name, type)
  }

  handlePickerChange = (date, name) => {
    this.props.handlePickerChange(date, name)
  }

  handleRadioChange = event => {
    this.props.handleRadioChange(event)
  }

  render() {
    const { classes, values, isFetchingIntelligentConfigViaType } = this.props
    console.log('Period: ', values)
    if (isFetchingIntelligentConfigViaType || _.isEmpty(values.config)) {
      return <Loading />
    } else if (
      isFetchingIntelligentConfigViaType ||
      _.isEmpty(values.config.period) ||
      _.isEmpty(values.config.yellow_blink)
    ) {
      return <Loading />
    }
    return (
      <Fragment>
        <Typography className={classes.title}>Chu kỳ đèn</Typography>
        <div className={classes.lightPeriod}>
          {values.config.period.map((phase, index) => {
            return (
              <div key={index}>
                <Typography className={classes.phaseName}>{phase.phase}</Typography>
                <div className={classes.row}>
                  <div className={classes.formGroup}>
                    <TextField
                      label={
                        <div className={classes.label}>
                          <div className={classNames(classes.light, classes.redLight)}></div>
                          <div className={classes.labelText}>Đèn đỏ mặc định</div>
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
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_red`,
                                  'sub',
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_red`,
                                  'add',
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name={`config.period[${index}].default_red`}
                      value={values.config.period[index].default_red}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <TextField
                      label={
                        <div className={classes.label}>
                          <div className={classNames(classes.light, classes.yellowLight)}></div>
                          <div className={classes.labelText}>Đèn vàng mặc định</div>
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
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_yellow`,
                                  'sub',
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_yellow`,
                                  'add',
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name={`config.period[${index}].default_yellow`}
                      value={values.config.period[index].default_yellow}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <TextField
                      label={
                        <div className={classes.label}>
                          <div className={classNames(classes.light, classes.greenLight)}></div>
                          <div className={classes.labelText}>Đèn xanh mặc định</div>
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
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_green`,
                                  'sub',
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].default_green`,
                                  'add',
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name={`config.period[${index}].default_green`}
                      value={values.config.period[index].default_green}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <TextField
                      label={
                        <div className={classes.label}>
                          <div className={classNames(classes.light, classes.redLight)}></div>
                          <div className={classes.labelText}>Đèn đỏ tối đa</div>
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
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].max_red`,
                                  'sub',
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].max_red`,
                                  'add',
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name={`config.period[${index}].max_red`}
                      value={values.config.period[index].max_red}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <TextField
                      label={
                        <div className={classes.label}>
                          <div className={classNames(classes.light, classes.greenLight)}></div>
                          <div className={classes.labelText}>Đèn xanh tối thiểu</div>
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
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].min_green`,
                                  'sub',
                                )
                              }
                            >
                              <Remove />
                            </IconButton>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              className={classes.iconButton}
                              onClick={event =>
                                this.handleIconButtonClick(
                                  event,
                                  `config.period[${index}].min_green`,
                                  'add',
                                )
                              }
                            >
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      name={`config.period[${index}].min_green`}
                      value={values.config.period[index].min_green}
                      onChange={event => this.handleInputChange(event)}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Typography className={classes.title}>Đèn vàng nhấp nháy</Typography>
        <div className={classes.yellowBlink}>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={values.config.yellow_blink.enabled}
                    onChange={event =>
                      this.handleSwitchChange(event, 'config.yellow_blink.enabled')
                    }
                  />
                }
                label="Bật"
              />
            </FormGroup>
          </FormControl>
          <RadioGroup
            className={classes.radioGroup}
            onChange={this.handleRadioChange}
            name="config.yellow_blink.mode"
            value={values.config.yellow_blink.mode}
          >
            <FormControlLabel value="static" control={<Radio color="primary" />} label="Cố định" />
            <FormControlLabel
              value="intelligent"
              control={<Radio color="primary" />}
              label="Thông minh"
            />
          </RadioGroup>
          <div>
            {values.config.yellow_blink.mode === 'static' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
                <div className={classes.row}>
                  <div className={classes.formGroup}>
                    <InlineTimePicker
                      ampm={false}
                      label="Bắt đầu"
                      variant="outlined"
                      format="HH:mm"
                      name="config.yellow_blink.start"
                      value={values.config.yellow_blink.start}
                      onChange={date => this.handlePickerChange(date, 'config.yellow_blink.start')}
                    />
                  </div>
                  <div className={classes.formGroup}>
                    <InlineTimePicker
                      ampm={false}
                      label="Kết thúc"
                      variant="outlined"
                      format="HH:mm"
                      name="config.yellow_blink.end"
                      value={values.config.yellow_blink.end}
                      onChange={date => this.handlePickerChange(date, 'config.yellow_blink.end')}
                    />
                  </div>
                </div>
              </MuiPickersUtilsProvider>
            )}
            {values.config.yellow_blink.mode === 'intelligent' && (
              <div className={classes.row}>
                <div className={classes.formGroup}>
                  <TextField
                    variant="outlined"
                    type="number"
                    name="threshold"
                    InputProps={{
                      inputProps: {
                        min: '0',
                        // max: '9999',
                      },
                    }}
                    label="Độ dài dòng chờ tối thiểu (mét)"
                    name="config.yellow_blink.threshold"
                    value={values.config.yellow_blink.threshold}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ trafficControl }) => ({
  isFetchingIntelligentConfigViaType: trafficControl.api.isFetchingIntelligentConfigViaType,
})

export default connect(mapStateToProps, { fetchIntelligentConfigViaType })(
  withStyles(styles)(PeriodLight),
)
