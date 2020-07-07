import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import TextInput from '../../components/TextInput'
import {
  TextField,
  Typography,
  Switch,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Select from 'react-select'

import {
  ProvinceControl,
  DistrictControl,
  CommuneControl,
  CamStateControl,
  GroupControl,
  NoOptionsMessage,
} from '../../components/Select/SelectControl'
import { getDataBeforeSearch } from 'actions/action_manageCam'
import { initSearchCam } from 'actions/action_camera'
import { changeSearchCamParams } from 'actions/action_search'
import { clearProvince, clearDistrict } from 'actions/action_political'

const state = [
  {
    label: 'Bình thường',
    value: '0',
  },
]
const styles = (theme) => ({
  root: {
    padding: '10px 10px',
    // flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '0.825rem',
    fontWeight: 500,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
  },
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
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

class Search extends Component {
  componentDidMount() {
    // this.props.getDataBeforeSearch()
    this.props.initSearchCam()
  }

  handleInputChange = (name) => (event) => {
    this.props.changeSearchCamParams({ [name]: event.target.value })
  }

  handleProvinceChange = (event, value, reason) => {
    if (value === null) {
      this.props.clearProvince()
    } else {
      this.props.changeSearchCamParams({ province: value })
    }
  }

  handleDistrictChange = (event, value = [], reason) => {
    if (value.length === 0) {
      this.props.clearDistrict()
    } else {
      this.props.changeSearchCamParams({ district: value })
    }
  }

  handleCommuneChange = (event, value = [], reason) => {
    this.props.changeSearchCamParams({ commune: value })
  }

  handleGroupChange = (event, value = [], reason) => {
    this.props.changeSearchCamParams({ group: value })
  }
  handleSwitchChange = (name) => (value) => {
    if (name === 'province' && value === null) {
    }
    this.props.changeSearchCamParams({ [name]: value })
  }

  render() {
    const {
      classes,
      theme,
      provinceOptions = [],
      districtOptions = [],
      communeOptions = [],
      groupOptions = [],
      searchCam = {},
    } = this.props

    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              TÌM KIẾM NÂNG CAO
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className="form-group">
              <TextInput
                fullWidth
                label="Nhập từ khóa tìm kiếm"
                type="search"
                value={searchCam.string}
                onChange={this.handleInputChange('string')}
              />
            </div>
            <div className="form-group">
              <Autocomplete
                blurOnSelect
                openOnFocus
                size="small"
                filterSelectedOptions
                options={provinceOptions}
                getOptionLabel={(option) => option.label}
                noOptionsText="Không có lựa chọn"
                value={searchCam.province}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tỉnh/Thành phố"
                    variant="outlined"
                  />
                )}
                onChange={this.handleProvinceChange}
              />
            </div>
            <div className="form-group">
              <Autocomplete
                blurOnSelect
                openOnFocus
                size="small"
                multiple
                filterSelectedOptions
                noOptionsText="Không có lựa chọn"
                options={districtOptions}
                getOptionLabel={(options) => options.label}
                value={searchCam.district}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Quận/Huyện"
                    variant="outlined"
                  />
                )}
                onChange={this.handleDistrictChange}
              />
            </div>
            <div className="form-group">
              <Autocomplete
                // freeSolo
                blurOnSelect
                openOnFocus
                size="small"
                multiple
                filterSelectedOptions
                noOptionsText="Không có lựa chọn"
                options={communeOptions}
                getOptionSelected={(option, value) => {
                  return _.isEqual(option, value)
                }}
                groupBy={(option) => option.group}
                getOptionLabel={(options) => options.label}
                value={searchCam.commune}
                renderInput={(params) => (
                  <TextField {...params} label="Phường/Xã" variant="outlined" />
                )}
                onChange={this.handleCommuneChange}
              />
            </div>
            <div className="form-group">
              <Autocomplete
                blurOnSelect
                openOnFocus
                size="small"
                multiple
                filterSelectedOptions
                noOptionsText="Không có lựa chọn"
                options={groupOptions}
                getOptionLabel={(options) => options.label}
                value={searchCam.group}
                renderInput={(params) => (
                  <TextField {...params} label="Nhóm" variant="outlined" />
                )}
                onChange={this.handleGroupChange}
              />
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, political }) => ({
  provinceOptions: political.provinces,
  districtOptions: political.districts,
  communeOptions: political.communes,
  groupOptions: political.groups,
  searchCam: cameras.searchCam,
})

export default connect(mapStateToProps, {
  // getDataBeforeSearch: getDataBeforeSearch,
  initSearchCam,
  changeSearchCamParams: changeSearchCamParams,
  clearProvince: clearProvince,
  clearDistrict: clearDistrict,
})(withStyles(styles, { withTheme: true })(Search))
