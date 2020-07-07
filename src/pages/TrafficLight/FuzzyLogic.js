import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core'
import _ from 'lodash'
import { fetchIntelligentConfigViaType } from 'actions/action_trafficControl'
import Loading from 'components/Loading'

const styles = theme => ({
  title: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 400,
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
  inputPropsTable: {
    width: 70,
    textAlign: 'center',
  },
})

class FuzzyLogic extends Component {
  componentDidMount() {
    this.props.fetchIntelligentConfigViaType({ type: 'fuzzylogic' })
  }
  handleInputChange = event => {
    this.props.handleInputChange(event)
  }
  render() {
    const { classes, values, isFetchingIntelligentConfigViaType } = this.props
    console.log('Fuzzy: ', values)
    if (isFetchingIntelligentConfigViaType || _.isEmpty(values.config)) {
      return <Loading />
    } else if (
      isFetchingIntelligentConfigViaType ||
      _.isEmpty(values.config.input) ||
      _.isEmpty(values.config.output)
    ) {
      return <Loading />
    }
    return (
      <Fragment>
        <Typography className={classes.title}>
          Tham số đầu vào - Độ dài dòng chờ (mét)
        </Typography>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Rất ngắn</TableCell>
                <TableCell align="center">Ngắn</TableCell>
                <TableCell align="center">Trung bình</TableCell>
                <TableCell align="center">Dài</TableCell>
                <TableCell align="center">Rất dài</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.config.input.map((phase, index1) => (
                <TableRow key={index1}>
                  <TableCell>{phase.phase}</TableCell>
                  {phase.params.map((item, index2) => {
                    if (_.has(item, 'min') && _.has(item, 'max')) {
                      return (
                        <TableCell align="center" key={index2}>
                          <div className={classes.tableCell}>
                            <span className={classes.tableCellSpan}>Từ</span>
                            <TextField
                              variant="outlined"
                              type="number"
                              InputProps={{
                                inputProps: {
                                  min: '0',
                                  className: classes.inputPropsTable,
                                },
                              }}
                              name={`config.input[${index1}].params[${index2}].min`}
                              value={item.min}
                              onChange={this.handleInputChange}
                            />
                            <span className={classes.tableCellSpan}>đến</span>
                            <TextField
                              variant="outlined"
                              type="number"
                              InputProps={{
                                inputProps: {
                                  min: '0',
                                  className: classes.inputPropsTable,
                                },
                              }}
                              name={`config.input[${index1}].params[${index2}].max`}
                              value={item.max}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </TableCell>
                      )
                    } else if (!_.has(item, 'max') && _.has(item, 'min')) {
                      return (
                        <TableCell align="center" key={index2}>
                          <div className={classes.tableCell}>
                            <span className={classes.tableCellSpan}>Trên</span>
                            <TextField
                              variant="outlined"
                              type="number"
                              InputProps={{
                                inputProps: {
                                  min: '0',
                                  className: classes.inputPropsTable,
                                },
                              }}
                              name={`config.input[${index1}].params[${index2}].min`}
                              value={item.min}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </TableCell>
                      )
                    } else if (_.has(item, 'max') && !_.has(item, 'min')) {
                      return (
                        <TableCell align="center" key={index2}>
                          <div className={classes.tableCell}>
                            <span className={classes.tableCellSpan}>Dưới</span>
                            <TextField
                              variant="outlined"
                              type="number"
                              InputProps={{
                                inputProps: {
                                  min: '0',
                                  className: classes.inputPropsTable,
                                },
                              }}
                              name={`config.input[${index1}].params[${index2}].max`}
                              value={item.max}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </TableCell>
                      )
                    }
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Typography className={classes.title}>
          Tham số đầu ra - Thời gian đèn xanh (giây)
        </Typography>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Rất ngắn</TableCell>
                <TableCell align="center">Ngắn</TableCell>
                <TableCell align="center">Trung bình</TableCell>
                <TableCell align="center">Dài</TableCell>
                <TableCell align="center">Rất dài</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {values.config.output.map((phase, index1) => (
                <TableRow key={index1}>
                  <TableCell>{phase.phase}</TableCell>
                  {phase.params.map((item, index2) => {
                      return (
                        <TableCell align="center" key={index2}>
                          <div className={classes.tableCell}>
                            <TextField
                              variant="outlined"
                              type="number"
                              InputProps={{
                                inputProps: {
                                  min: '0',
                                  className: classes.inputPropsTable,
                                },
                              }}
                              name={`config.output[${index1}].params[${index2}].value`}
                              value={item.value}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </TableCell>
                      )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Fragment>
    )
  }
}
const mapStateToProps = ({ trafficControl }) => ({
  isFetchingIntelligentConfigViaType:
    trafficControl.api.isFetchingIntelligentConfigViaType,
})

export default connect(mapStateToProps, { fetchIntelligentConfigViaType })(
  withStyles(styles)(FuzzyLogic),
)
