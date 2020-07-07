import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Table,
  TableRow,
  TableCell,
} from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { red, green, yellow } from '@material-ui/core/colors'
import Scrollbars from 'react-custom-scrollbars'

const styles = theme => ({
  root: {
    display: 'flex',
    paddingLeft: 48,
    paddingRight: 48,
    height: '100%',
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 400,
    marginTop: 16,
  },
  lightPeriod: {
    display: 'flex',
  },
  left: {
    width: '50%',
    marginTop: 16,
    paddingLeft: 20,
    borderRight: `1px solid #ccc`,
  },
  right: {
    width: '50%',
    marginTop: 16,
    paddingLeft: 20,
  },
  phaseName: {
    marginBottom: 16,
    fontSize: 16,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
})

class IntelligentMode extends Component {
  handleClick = () => {}

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
                      <div className={classNames(classes.light, classes.redLight)}></div>
                      <div className={classes.labelText}>Đèn đỏ tối thiểu</div>
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
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.greenLight)}></div>
                      <div className={classes.labelText}>Đèn xanh tối đa</div>
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
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.yellowLight)}></div>
                      <div className={classes.labelText}>Đèn vàng tối đa</div>
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
                      <div className={classes.labelText}>Đèn vàng tối thiểu</div>
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
                      <div className={classNames(classes.light, classes.redLight)}></div>
                      <div className={classes.labelText}>Đèn đỏ tối thiểu</div>
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
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.greenLight)}></div>
                      <div className={classes.labelText}>Đèn xanh tối đa</div>
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
            <div className={classes.row}>
              <div className={classes.formGroup}>
                <TextField
                  label={
                    <div className={classes.label}>
                      <div className={classNames(classes.light, classes.yellowLight)}></div>
                      <div className={classes.labelText}>Đèn vàng tối đa</div>
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
                      <div className={classes.labelText}>Đèn vàng tối thiểu</div>
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
        <Typography className={classes.title}>Tham số đầu vào</Typography>
        <div>
          <Table>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Rất ngắn</TableCell>
              <TableCell>Ngắn</TableCell>
              <TableCell>Trung bình</TableCell>
              <TableCell>Dài</TableCell>
              <TableCell>Rất dài</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Huỳnh Ngọc Huệ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hà Huy Tập</TableCell>
            </TableRow>
          </Table>
        </div>
        <Typography className={classes.title}>Tham số đầu ra</Typography>
        <div>
        <Table>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Rất ngắn</TableCell>
              <TableCell>Ngắn</TableCell>
              <TableCell>Trung bình</TableCell>
              <TableCell>Dài</TableCell>
              <TableCell>Rất dài</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Huỳnh Ngọc Huệ</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hà Huy Tập</TableCell>
            </TableRow>
          </Table>
        </div>
      </div>
    )
  }
}

export default connect()(withStyles(styles)(IntelligentMode))
