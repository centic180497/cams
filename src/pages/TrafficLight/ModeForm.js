import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Switch,
  FormControl,
  FormGroup,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Button,
  CircularProgress,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { red, green, yellow } from '@material-ui/core/colors'
import DateFnsUtils from '@date-io/date-fns'
import { InlineTimePicker, MuiPickersUtilsProvider } from 'material-ui-pickers'
import viLocale from 'date-fns/locale/vi'
import {
  fetchConfigTrafficLightViaMode,
  switchTrafficLightMode,
} from 'actions/action_trafficControl'
import { toPath } from 'lodash'
import Loading from 'components/Loading'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'
import PeriodLight from './PeriodLight'
import FuzzyLogic from './FuzzyLogic'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingLeft: 48,
    paddingRight: 48,
  },
  content: {
    flexGrow: 1,
  },
  staticMode: {
    // marginLeft: 20,
  },
  intelligentMode: {
    // marginLeft: 20,
  },
  modeTitle: {
    fontSize: 24,
  },
  radioGroup: {
    flexDirection: 'row',
    // marginLeft: 20,
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
    fontSize: 18,
    marginTop: 16,
    fontWeight: 400,
  },
  lightPeriod: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 20,
    marginTop: 20
  },
  yellowBlink: {
    // display: 'flex',
    // flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 16,
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

  inputPropsTable: {
    width: 70,
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
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    width: 100,
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 16,
  },
  errorMessages: {
    color: 'red',
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableCellSpan: {
    paddingLeft: 8,
    paddingRight: 8,
  },
})

class ModeForm extends Component {
  state = {
    tab: 0,
  }

  handleTabChange = (event, value) => {
    this.setState({ tab: value })
  }

  handleRadioChange = event => {
    switch (event.target.name) {
      case 'mode':
        if (event.target.value === 'static') {
          this.props.fetchConfigTrafficLightViaMode({ mode: event.target.value })
        }
        this.setState({ tab: 0 })
        break
      default:
        break
    }
    this.props.switchTrafficLightMode({ mode: event.target.value })
    this.props.setFieldValue(event.target.name, event.target.value)
  }

  handleIconButtonClick = (event, name, type) => {
    const { values, setFieldValue } = this.props
    let offset = 0
    if (type === 'sub') {
      offset = -1
    } else if (type === 'add') {
      offset = 1
    }
    const path = toPath(name)
    let p = 0,
      obj = values
    while (obj && p < path.length) {
      obj = obj[path[p++]]
    }

    setFieldValue(name, obj + offset > 0 ? obj + offset : 0)
  }

  handleInputChange = event => {
    // if (event.target.value === '') 
    this.props.setFieldValue(event.target.name, parseInt(event.target.value || 0))
  }

  handlePickerChange = (date, name) => {
    this.props.setFieldValue(name, date)
  }

  handleSwitchChange = (event, name) => {
    this.props.setFieldValue(name, event.target.checked)
  }

  render() {
    const { tab } = this.state
    const {
      classes,
      isFetchingConfigViaMode,
      isFetchingIntelligentConfigViaType,
      isEditingConfig,
      values,
      errorConfig,
      handleSubmit,
    } = this.props
    return (
      <form className={classes.root} onSubmit={handleSubmit}>
        <Typography className={classes.modeTitle}>Chế độ làm việc</Typography>
        <RadioGroup
          className={classes.radioGroup}
          onChange={event => this.handleRadioChange(event)}
          name="mode"
          value={values.mode}
        >
          <FormControlLabel value="static" control={<Radio color="primary" />} label="Cố định" />
          <FormControlLabel
            value="intelligent"
            control={<Radio color="primary" />}
            label="Thông minh"
          />
        </RadioGroup>
        {isFetchingConfigViaMode ? (
          <Loading />
        ) : (
          <div className={classes.content}>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              {values.mode === 'static' && (
                <div className={classes.staticMode}>
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
                                    <div
                                      className={classNames(classes.light, classes.redLight)}
                                    ></div>
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
                                    <InputAdornment
                                      position="start"
                                      className={classes.inputAdornment}
                                    >
                                      <IconButton
                                        className={classes.iconButton}
                                        onClick={event =>
                                          this.handleIconButtonClick(
                                            event,
                                            `config.period[${index}].red`,
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
                                            `config.period[${index}].red`,
                                            'add',
                                          )
                                        }
                                      >
                                        <Add />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                name={`config.period[${index}].red`}
                                value={phase.red}
                                onChange={event => this.handleInputChange(event)}
                              />
                            </div>
                            <div className={classes.formGroup}>
                              <TextField
                                label={
                                  <div className={classes.label}>
                                    <div
                                      className={classNames(classes.light, classes.yellowLight)}
                                    ></div>
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
                                      <IconButton
                                        className={classes.iconButton}
                                        onClick={event =>
                                          this.handleIconButtonClick(
                                            event,
                                            `config.period[${index}].yellow`,
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
                                            `config.period[${index}].yellow`,
                                            'add',
                                          )
                                        }
                                      >
                                        <Add />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                name={`config.period[${index}].yellow`}
                                value={phase.yellow}
                                onChange={event => this.handleInputChange(event)}
                              />
                            </div>
                            <div className={classes.formGroup}>
                              <TextField
                                label={
                                  <div className={classes.label}>
                                    <div
                                      className={classNames(classes.light, classes.greenLight)}
                                    ></div>
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
                                      <IconButton
                                        className={classes.iconButton}
                                        onClick={event =>
                                          this.handleIconButtonClick(
                                            event,
                                            `config.period[${index}].green`,
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
                                            `config.period[${index}].green`,
                                            'add',
                                          )
                                        }
                                      >
                                        <Add />
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                                name={`config.period[${index}].green`}
                                value={phase.green}
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
                            onChange={date =>
                              this.handlePickerChange(date, 'config.yellow_blink.start')
                            }
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
                            onChange={date =>
                              this.handlePickerChange(date, 'config.yellow_blink.end')
                            }
                          />
                        </div>
                      </div>
                    </MuiPickersUtilsProvider>
                  </div>
                </div>
              )}
              {values.mode === 'intelligent' && (
                <div className={classes.intelligentMode}>
                  <AppBar position="static">
                    <Tabs value={tab} onChange={this.handleTabChange}>
                      <Tab label="Tham số mặc định " />
                      <Tab label="Tham số điều khiển" />
                    </Tabs>
                  </AppBar>
                  {tab === 0 && (
                    <PeriodLight
                      values={values}
                      handleSwitchChange={this.handleSwitchChange}
                      handleInputChange={this.handleInputChange}
                      handleIconButtonClick={this.handleIconButtonClick}
                      handleRadioChange={this.handleRadioChange}
                      handlePickerChange={this.handlePickerChange}
                    />
                  )}
                  {tab === 1 && (
                    <FuzzyLogic values={values} handleInputChange={this.handleInputChange} />
                  )}
                </div>
              )}
              <div className={classes.actionButton}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isEditingConfig}
                  className={classes.button}
                >
                  {isEditingConfig ? <CircularProgress size={24} /> : 'Áp dụng'}
                </Button>
                <div className={classes.error}>
                  <span className={classes.errorMessages}>
                    {errorConfig ? errorConfig[0] : null}
                  </span>
                </div>
              </div>
            </Scrollbars>
          </div>
        )}
      </form>
    )
  }
}
const mapStateToProps = ({ trafficControl }) => {
  return {
    errorConfig: trafficControl.error,
    isFetchingConfigViaMode: trafficControl.api.isFetchingConfigViaMode,
    isEditingConfig: trafficControl.api.isEditingConfig,
    isFetchingIntelligentConfigViaType: trafficControl.api.isFetchingIntelligentConfigViaType,
  }
}

export default connect(mapStateToProps, { fetchConfigTrafficLightViaMode, switchTrafficLightMode })(
  withStyles(styles)(ModeForm),
)
