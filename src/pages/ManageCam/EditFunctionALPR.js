import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  switchBase: {
    height: 20
  }
})

class EditFunctionALPR extends Component{
  _onSwitchChange = name => event => {
    event.stopPropagation()
    this.props.setFieldValue(name, event.target.checked, true)
  }
  render(){
    const { classes, values }  = this.props
    return(
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Switch 
              color="primary"
              // classes={{
              //   switchBase: classes.switchBase
              // }}
              size="small"
              checked={values.alpr}
              onClick={this._onSwitchChange('alpr')}
            />
          </div>
          <div>
            <Typography>Nhận dạng biển số</Typography>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    )
  }
}

export default withStyles(styles)(EditFunctionALPR)