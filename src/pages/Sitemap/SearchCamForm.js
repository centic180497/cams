import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Select from 'react-select'
import _ from 'lodash'

import TextInput from '../../components/TextInput'
import {
  ProvinceControl,
  DistrictControl,
  CommuneControl,
  CamStateControl,
  GroupControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'

const styles = theme => ({
  textField: {
    fontSize: '0.875rem',
  },
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
})

const selectStyles = {
  menu: styles => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

class SearchCamForm extends Component {
  _onTextInputChange = (event) => {
    this.props.handleChange(event)
  }

  
  render() {
    const {
      classes,
      values,
      handleSubmit,
      provinceOptions = [],
      districtOptions = [],
      communeOptions = [],
      groupOptions = [],
    } = this.props
    return (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextInput
            label="Nhập từ khóa tìm kiếm"
            name="string"
            fullWidth
            type="search"
            onChange={this._onTextInputChange}
          />
        </div>
        <div className="form-group">
          <Select
            classes={classes}
            components={{
              Control: ProvinceControl,
              NoOptionsMessage: NoOptionsMessage,
            }}
            isClearable
            placeholder={false}
            styles={selectStyles}
            options={provinceOptions}
          />
        </div>
        <div className="form-group">
          <Select
            classes={classes}
            components={{
              Control: DistrictControl,
              NoOptionsMessage: NoOptionsMessage,
            }}
            isClearable
            options={districtOptions}
            placeholder={false}
            isMulti
            styles={selectStyles}
            value={values.district}
            // onChange={this.handleDistrictChange}
          />
        </div>
        <div className="form-group">
          <Select
            classes={classes}
            components={{
              Control: CommuneControl,
              NoOptionsMessage: NoOptionsMessage,
            }}
            isClearable
            isMulti
            options={communeOptions}
            placeholder={false}
            styles={selectStyles}
            value={values.commune}
            // onChange={this.handleSwitchChange('commune')}
          />
        </div>
        <div className="form-group">
          <Select
            classes={classes}
            components={{
              Control: GroupControl,
              NoOptionsMessage: NoOptionsMessage,
            }}
            isClearable
            isMulti
            options={groupOptions}
            placeholder={false}
            styles={selectStyles}
            value={values.group}
            // onChange={this.handleSwitchChange('group')}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = ({ political }) => ({
  provinceOptions: political.provinces,
  districtOptions: political.districts,
  communeOptions: political.communes,
  groupOptions: political.groups,
})
export default connect(mapStateToProps)(withStyles(styles)(SearchCamForm))
