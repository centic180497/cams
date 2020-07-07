import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import TextInput from '../../TextInput'
import {
  getCameraLocations,
  loadDistrict,
  loadCommune,
  editCameraLocations,
} from '../../../actions/action_camera'
import { isEmpty } from 'lodash'
import _ from 'lodash'
const selectStyles = {
  control: styles => ({
    ...styles,
    width: '600px',
    // border: '1px solid #2874A6',
    boxShadow: 'none',
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    // border: '1px solid #2874A6',
    fontSize: '14px',
  }),
}
// let provinceOptions = []
// let districtOptions = []
// let communeOptions = []
class Locations extends Component {
  componentDidMount() {
    this.props.getCameraLocations(this.props.match.params)
  }

  render() {
    const {
      isLoading,
      provinces,
      districts,
      communes,
      locations,
      province,
      district,
      commune,
      loadDistrict,
      loadCommune,
      editCameraLocations,
      match,
    } = this.props
    let new_province = _.pick(province, ['name', 'province_code'])
    let new_district = _.pick(district, ['name', 'district_code'])
    let new_commune = _.pick(commune, ['name', 'commune_code'])
    if (isLoading) return <div className="loader" />
    return (
      <LocationsForm
        provinces={provinces}
        province={new_province}
        districts={districts}
        district={new_district}
        communes={communes}
        commune={new_commune}
        locations={locations}
        loadDistrict={loadDistrict}
        loadCommune={loadCommune}
        editCameraLocations={editCameraLocations}
        match={match}
      />
    )
  }
}

class LocationsForm extends Component {
  state = {
    province: {
      value: this.props.province.province_code,
      label: this.props.province.name,
    },
    district: {
      value: this.props.district.district_code,
      label: this.props.district.name,
    },
    commune: {
      value: this.props.commune.commune_code,
      label: this.props.commune.name,
    },
    hamlet: this.props.locations.hamlet,
    street: this.props.locations.street,
    group: this.props.locations.group,
    crossroad: this.props.locations.crossroad,
    position: this.props.locations.position,
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onProvinceChange = province => {
    if (province && province !== null && province !== 'undefined') {
      this.setState({
        province: province,
        district: '',
        commune: '',
      })
      this.props.loadDistrict(province.value)
    }
  }
  onDistrictChange = district => {
    if (district && district !== null && district !== 'undefined') {
      this.setState({
        district: district,
        commune: '',
      })
      this.props.loadCommune(district.value)
    }
  }
  onCommuneChange = commune => {
    if (commune && commune !== null && commune !== 'undefined') {
      this.setState({
        commune: commune,
      })
    }
  }

  editLocation = () => {
    this.props.editCameraLocations(this.props.match.params, this.state)
  }

  render() {
    const { provinces, districts, communes } = this.props

    const provinceOptions = provinces.map(province => {
      return {
        value: province.province_code,
        label: province.name,
      }
    })
    const districtOptions = districts.map(district => {
      return {
        value: district.district_code,
        label: district.name,
      }
    })

    const communeOptions = communes.map(commune => {
      return {
        value: commune.commune_code,
        label: commune.name,
      }
    })
    const errors = {}
    return (
      <div className="camera-detail ml-4">
        <div className="item">
          <span className="info-title">Tỉnh/Thành phố:</span>
          <div className="fix-width-input">
            <Select
              name="province"
              placeholder="Tỉnh/Thành phố"
              options={provinceOptions}
              styles={selectStyles}
              onChange={this.onProvinceChange}
              value={this.state.province}
            />
            {errors.province ? (
              <div className="text-left invalid-feedback">
                {errors.province}
              </div>
            ) : null}
          </div>
        </div>
        <div className="item">
          <span className="info-title">Quận/Huyện:</span>
          <div className="fix-width-input">
            <Select
              name="district"
              isDisabled={isEmpty(districts)}
              placeholder="Quận/Huyện"
              options={districtOptions}
              styles={selectStyles}
              onChange={this.onDistrictChange}
              value={isEmpty(districts) ? '' : this.state.district}
            />
          </div>
        </div>
        <div className="item">
          <span className="info-title">Xã/Phường</span>
          <div className="fix-width-input">
            <Select
              name="commune"
              isDisabled={isEmpty(communes)}
              placeholder="Xã/Phường"
              options={communeOptions}
              styles={selectStyles}
              onChange={this.onCommuneChange}
              value={isEmpty(districts) ? '' : this.state.commune}
            />
          </div>
        </div>
        <div className="item">
          <span className="info-title">Thôn(Xóm)/Tổ dân phố:</span>
          <div className="fix-width-input">
            <TextInput
              name="hamlet"
              placeholder="Thôn(Xóm)/Tổ dân phố"
              type="text"
              onChange={this.onChange}
              value={this.state.hamlet}
            />
          </div>
        </div>
        <div className="item">
          <span className="info-title">Đường:</span>
          <div className="fix-width-input">
            <TextInput
              name="street"
              placeholder="Đường"
              type="text"
              onChange={this.onChange}
              value={this.state.street}
            />
          </div>
        </div>
        <div className="item">
          <span className="info-title">Nhóm:</span>
          <div className="fix-width-input">
            <TextInput
              name="group"
              placeholder="Nhóm"
              type="text"
              onChange={this.onChange}
              value={this.state.group}
            />
          </div>
        </div>
        <div className="item">
          <span className="info-title">Vị trí lắp đặt:</span>
          <div className="fix-width-input">
            <TextInput
              name="position"
              placeholder="Vị trí lắp đặt"
              type="text"
              onChange={this.onChange}
              value={this.state.position}
            />
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={this.editLocation}>
          Lưu
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ cameras }) => {
  const province = cameras.currentCamera.provinces.find(province => {
    return province.province_code === cameras.currentCamera.locations.province
  })
  const district = cameras.currentCamera.districts.find(district => {
    return district.district_code === cameras.currentCamera.locations.district
  })
  const commune = cameras.currentCamera.communes.find(commune => {
    return commune.commune_code === cameras.currentCamera.locations.commune
  })
  return {
    province: province,
    district: district,
    commune: commune,
    provinces: cameras.currentCamera.provinces,
    districts: cameras.currentCamera.districts,
    communes: cameras.currentCamera.communes,
    isLoading: cameras.isLoading,
    locations: cameras.currentCamera.locations,
  }
}

export default connect(
  mapStateToProps,
  {
    getCameraLocations,
    loadDistrict,
    loadCommune,
    editCameraLocations,
  },
)(Locations)
