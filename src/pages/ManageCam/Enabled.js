import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
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

class Enabled extends Component{

  handleSwitch = name => event => {
    event.stopPropagation()
    this.props.changeAddCameraParams({[name]: event.target.checked})
  }

  render(){
    const { classes, addCamera } = this.props
    return (
      <ExpansionPanel expanded={false}>
        <ExpansionPanelSummary 
          className={classes.pannelSummary}
        >
          <div>
            <Switch 
              color="primary"
              checked={addCamera.enabled}
              classes={{
                switchBase: classes.switchBase
              }}
              onClick={this.handleSwitch('enabled')}
            />
          </div>
          <div>
            <Typography>Enable</Typography>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  addCamera: cameras.addCamera
})

export default connect(mapStateToProps, {
  changeAddCameraParams: changeAddCameraParams
})(withStyles(styles)(Enabled))


