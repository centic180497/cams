import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {changeListSize } from '../../actions/action_followList'


const styles = theme => ({
  root: {

  },
  group: {
    display: 'flex',
    flexDirection: 'row'
  },
  formControlLabel: {
    marginBottom: 0
  }
})

class FollowListSize extends Component{
  
  handleChange = (e) => {
    this.props.changeListSize(Number(e.target.value))
  }

  render(){
    const { classes, listSize } = this.props
    return(
      <div className={classes.root}>
        <RadioGroup
          className={classes.group}
          value={`${listSize}`}
          onChange={this.handleChange}
        >
          <FormControlLabel
            className={classes.formControlLabel}
            value="4"
            control={<Radio color="primary" />}
            label="2x2"
            labelPlacement="start"
          />          
          <FormControlLabel
            className={classes.formControlLabel}
            value="9"
            control={<Radio color="primary" />}
            label="3x3"
            labelPlacement="start"
          />          
          <FormControlLabel
            className={classes.formControlLabel}
            value="16"
            control={<Radio color="primary" />}
            label="4x4"
            labelPlacement="start"
          />          
          {/* <FormControlLabel
            value={4}
            control={<Radio color="primary" />}
            label="2x2"
            labelPlacement="start"
          />           */}
        </RadioGroup>
      </div>
    )
  }
}
const mapStateToProps = ({followList}) => ({
  listSize: followList.listSize
})

export default connect(mapStateToProps, 
  {
    changeListSize: changeListSize
  }
)(withStyles(styles)(FollowListSize))

