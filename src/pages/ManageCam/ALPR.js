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
  switchBase: {
    height: 24
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
    // marginTop: -12,
    // marginBottom: -12
  },
})
class ALPR extends Component{

  handleSwitch = name => event => {
    event.stopPropagation()
    this.props.changeAddCameraParams({[name]: event.target.checked})
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
              color="primary"
              checked={addCamera.alpr}
              // classes={{
              //   switchBase: classes.switchBase
              // }}
              size="small"
              onClick={this.handleSwitch('alpr')}
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

const mapStateToProps = ({cameras}) => ({
  addCamera: cameras.addCamera,
})

export default connect(mapStateToProps, {
  changeAddCameraParams: changeAddCameraParams
})(withStyles(styles)(ALPR))