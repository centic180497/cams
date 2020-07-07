import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { Player } from 'components/player_mp4'
import _ from 'lodash'

import TextInput from 'components/TextInput'
import Viewer from 'react-viewer'

const selectStyles = {
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

const ViolationTypeOptions = [
  { value: 1, label: 'Vượt đèn đỏ' },
  { value: 2, label: 'Lấn làn' },
]

const VehicleTypeOptions = [
  { value: 1, label: 'Ô tô' },
  { value: 2, label: 'Xe máy' },
  { value: 3, label: 'Xe tải' },
  { value: 4, label: 'Xe khách' },
  { value: 5, label: 'Xe buýt' },
]

const styles = (theme) => ({
  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(19px, 14px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '2.5px 0 2.5px 6px',
  },
  form: {
    padding: 8,
  },
  thumnail: {
    width: 200,
    // height: 180,
    padding: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 400,
  },
  thumnailWrapper: {
    display: 'flex',
    // justifyContent: 'center',
  },
  videoWrapper: {
    display: 'flex',
    height: 320
    // justifyContent: 'center',
  },
})

class ViolationDetailForm extends Component {
  state = {
    show: false,
  }
  handleSelectChange = (name, event, values, reason) => {
    this.props.setFieldValue(name, values)
  }

  handleInputChange = (event) => {
    this.props.handleChange(event)
  }

  handlePickerChange = (name, date) => {
    this.props.setFieldValue(name, date)
  }

  render() {
    const {
      classes,
      values = {},
      detail = {},
      handleSubmit,
      dirty,
    } = this.props
    let imgArr = []
    if (_.has(values, 'thumnails'))
      imgArr = values.thumnails.map((item) => ({
        src: `${item}`,
        alt: values.plateNumber,
      }))
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className="form-group">
          <Autocomplete
            freeSolo
            openOnFocus
            blurOnSelect
            disableClearable
            size="small"
            options={ViolationTypeOptions}
            getOptionLabel={(options) => options.label}
            value={values.violationType}
            renderInput={(params) => (
              <TextField {...params} label="Loại vi phạm" variant="outlined" />
            )}
            onChange={(event, value, reason) =>
              this.handleSelectChange('violationType', event, value, reason)
            }
          />
        </div>
        <div className="form-group">
          <TextInput
            fullWidth
            label="Địa điểm"
            value={values.address}
            name="location"
            disabled
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <Autocomplete
            freeSolo
            openOnFocus
            blurOnSelect
            disableClearable
            size="small"
            options={VehicleTypeOptions}
            getOptionLabel={(options) => options.label}
            value={values.vehicleType}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Loại phương tiện"
                variant="outlined"
              />
            )}
            onChange={(event, value, reason) =>
              this.handleSelectChange('vehicleType', event, value, reason)
            }
          />
        </div>
        <div className="form-group">
          <TextInput
            fullWidth
            label="Biển số xe"
            value={values.plateNumber}
            name="plateNumber"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <TextInput
            fullWidth
            label="Thời gian"
            disabled
            value={values.timestamp}
            name="timestamp"
            // onChange={this.handleInputChange}
          />
        </div>

        <div className="form-group">
          <Typography className={classes.label}>Hình ảnh</Typography>
          <div className={classes.thumnailWrapper}>
            {_.has(values, 'thumnails') &&
              values.thumnails.map((item, index) => (
                <img
                  key={index}
                  alt="Ảnh vi phạm"
                  src={`${item}`}
                  className={classes.thumnail}
                  onClick={() => this.setState({ show: true })}
                />
              ))}
            {_.has(values, 'thumnails') && (
              <Viewer
                visible={this.state.show}
                onClose={() => this.setState({ show: false })}
                images={imgArr}
              />
            )}
          </div>
        </div>
        <div className="form-group">
          <Typography className={classes.label}>Video</Typography>
          <div className={classes.videoWrapper}>
            <Player>
              <source src={`${detail.video}`} type="video/mp4" />
            </Player>
          </div>
        </div>
        <div className="form-group">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!dirty}
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(ViolationDetailForm)
