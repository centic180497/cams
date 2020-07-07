import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { changeVehicleType } from 'actions/action_flow'

const styles = theme => ({
  root: {},
  formGroup: {
    justifyContent: 'center',
  },
  bike: {
    color: '#154360',
    '&::checked': {
      color: '#154360',
    },
  },
  bikeChecked: {
    color: '#154360',
  },
  car: {
    color: '#CA6F1E',
    '&::checked': {
      color: '#CA6F1E',
    },
  },
  carChecked: {
    color: '#CA6F1E',
  },
  truck: {
    color: 'red',
    '&::checked': {
      color: 'red',
    },
  },
  truckChecked: {},
  minibus: {
    color: '#28B463',
    '&::checked': {
      color: '#28B463',
    },
  },
  minibusChecked: {},
})

class VehicleType extends Component {
  componentDidUpdate(){
    console.log('vehicleType did update')
  }
  handleChange = (name, event) => {
    this.props.changeVehicleType({ [name]: event.target.checked })
  }

  render() {
    const { classes, type = []} = this.props
    return (
      <div className={classes.root}>
        <FormGroup row className={classes.formGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={type.includes('bike')}
                onChange={event => this.handleChange('bike', event)}
                color="default"
                classes={{
                  root: classes.bike,
                  checked: classes.bikeChecked,
                }}
              />
            }
            label="Xe máy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={type.includes('car')}
                onChange={event => this.handleChange('car', event)}
                color="default"
                classes={{
                  root: classes.car,
                  checked: classes.carChecked,
                }}
              />
            }
            label="Ô tô"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={type.includes('truck')}
                onChange={event => this.handleChange('truck', event)}
                color="default"
                classes={{
                  root: classes.truck,
                  checked: classes.truckChecked,
                }}
              />
            }
            label="Xe tải"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={type.includes('minibus')}
                onChange={event => this.handleChange('minibus', event)}
                color="default"
                classes={{
                  root: classes.minibus,
                  checked: classes.minibusChecked,
                }}
              />
            }
            label="Xe khách"
          />
        </FormGroup>
      </div>
    )
  }
}

const mapStateToProps = ({ flow }) => {
  return {
    type: flow.type,
  }
}

export default connect(mapStateToProps, { changeVehicleType })(withStyles(styles)(VehicleType))
