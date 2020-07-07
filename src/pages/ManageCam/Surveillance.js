import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { 
  changeAddCameraParams,
} from '../../actions/action_camera'

const styles = theme => ({
  switch: {
    height: 20
  }
})

class Surveillance extends Component{
  handleSwitch = name => event => {
    event.stopPropagation()
    this.props.changeAddCameraParams({[name]: event.target.checked})
  }
  render(){
    const { classes, addCamera } = this.props
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Switch 
              color="primary"
              checked={addCamera.surveillance}
              // classes={{
              //   switchBase: classes.switch
              // }}
              size="small"
              onClick={this.handleSwitch('surveillance')}
            />
          </div>
          <div>
            <Typography>Giám sát thông minh (Cấu hình các vùng nhận dạng...)</Typography>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  addCamera: cameras.addCamera,
})

export default connect(mapStateToProps, {
  changeAddCameraParams: changeAddCameraParams,
})(withStyles(styles)(Surveillance))