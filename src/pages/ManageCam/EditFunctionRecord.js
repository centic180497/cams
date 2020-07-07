import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TextInput from '../../components/TextInput'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash'

const styles = theme => ({
  switch: {
    zIndex: 1
  },
  switchBase: {
    height: 20
  },
  formControlLabel: {
    marginBottom: 0
  }, 
  details: {
    flexDirection: 'column'
  }
})

class EditFunctionRecord extends Component{
  _onSwitchChange = name => event => {
    event.stopPropagation()
    console.log(name, event.target.value)
    this.props.setFieldValue(name, event.target.checked, true)
  }

  _onInputChange = event => {
    this.props.handleChange(event)
  }

  render(){
    const {
      classes,
      values,
      errors = {}
    } = this.props
    return(
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Switch
              className={classes.switch}
              color="primary"
              // classes={{
              //   switchBase: classes.switchBase
              // }}
              size="small"
              checked={Boolean(values.record)}
              onClick={this._onSwitchChange('record')}
            />
          </div>
          <div>
            <Typography noWrap>Ghi hình</Typography>
          </div>
        </ExpansionPanelSummary>
        {Boolean(values.record) && <ExpansionPanelDetails className={classes.details}>
          <div className="form-group">
            <TextInput 
              label="Độ dài file video (phút)"
              fullWidth
              type="number"
              name="record_file_duration"
              value={values.record_file_duration}
              onChange={this._onInputChange}
              error={!_.isEmpty(errors.record_file_duration)}
              helperText={!_.isEmpty(errors.record_file_duration) ? errors.record_file_duration : ''}
            />
          </div>
          <div className="form-group">
            <TextInput 
              label="Thời gian lưu trữ video (ngày)"
              type="number"
              fullWidth
              name="record_max_keep_days"
              value={values.record_max_keep_days}
              onChange={this._onInputChange}
              error={!_.isEmpty(errors.record_max_keep_days)}
              helperText={!_.isEmpty(errors.record_max_keep_days) ? errors.record_max_keep_days : ''}
            />
          </div>
        </ExpansionPanelDetails>}
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(EditFunctionRecord)