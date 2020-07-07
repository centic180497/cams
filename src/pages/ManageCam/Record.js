import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import TextInput from '../../components/TextInput'
import { 
  changeAddCameraParams,
} from '../../actions/action_camera'

const styles = theme => ({
  root: {

  },
  row: {

  },
  switch: {
    zIndex: 1
  },
  switchBase: {
    height: 20
  },
  formControlLabel: {
    marginBottom: 0
  },
  heading: {

  },
  expansionPanelDetails: {
    flexDirection: 'column'
  },
  pannelSummary: {
    // display: 'flex',
    // flexDirection: 'row',
    // textAlign: 'left'
    // marginTop: -12,
    // marginBottom: -12
  },
})
class Record extends Component{
  
  handleSwitch = name => event => {
    event.stopPropagation()
    this.props.changeAddCameraParams({[name]: event.target.checked})
  }
  
  onChange = name => event => {
    this.props.changeAddCameraParams({[name]: Number(event.target.value)})
  }

  render(){
    const { classes, addCamera } = this.props
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary 
          className={classes.pannelSummary}
          expandIcon={<ExpandMoreIcon />}
          
        >
          <div>
            <Switch 
              className={classes.switch}
              checked={addCamera.record}
              color="primary"
              // classes={{
              //   switchBase: classes.switchBase
              // }}
              size="small"
              onClick={this.handleSwitch('record')}
            />
            <Typography>Ghi hình</Typography>
          </div>
          <div>
            <Typography noWrap>Độ dài file video, thời gian lưu trữ</Typography>
          </div>
          {/* <div>
            <Typography noWrap>Độ dài file video, thời gian lưu trữ</Typography>
          </div> */}
        </ExpansionPanelSummary>
        {addCamera.record && <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <div className="form-group">
            <TextInput
              label="Độ dài file video (phút)"
              fullWidth
              type="number"
              value={addCamera.record_file_duration}
              onChange={this.onChange('record_file_duration')}
            />      
          </div>
          <div className="form-group">
            <TextInput
              label="Thời gian lưu trữ file video (ngày)"
              type="number"
              fullWidth
              value={addCamera.record_max_keep_days}
              onChange={this.onChange('record_max_keep_days')}
            />
          </div>
        </ExpansionPanelDetails>}
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  addCamera: cameras.addCamera,
})

export default connect(mapStateToProps, {
  changeAddCameraParams: changeAddCameraParams,
})(withStyles(styles)(Record))