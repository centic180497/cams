import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import SwipeableViews from 'react-swipeable-views'
import className from 'classnames'

import Connect from './Connect'
import Params from './Params'
import AddCamParams from './AddCamParams'
import Functions from './Functions'

import { reloadPolitical } from 'actions/action_political'

const styles = (theme) => ({
  root: {
    padding: '5px 0 5px 10px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  stepper: {},
  actionsContainer: {},
  button: {},
  remaining: {
    flexGrow: 1,
  },
})

function getSteps() {
  return ['Kết nối', 'Tham số', 'Chức năng']
}

class AddCamera extends Component {
  componentDidMount() {}

  componentWillUnmount() {
    this.props.reloadPolitical({ communes: [] })
  }
  render() {
    const { classes, activeStep } = this.props
    const steps = getSteps()
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div className={classes.remaining}>
          {activeStep === 0 && <Connect />}
          {activeStep === 1 && <AddCamParams />}
          {activeStep === 2 && <Functions />}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras }) => ({
  activeStep: cameras.addCamera.activeStep,
})

export default connect(mapStateToProps, {
  reloadPolitical,
})(withStyles(styles)(AddCamera))
