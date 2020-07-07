import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from './Loading'
import DeleteCamModal from 'pages/ManageCam/DeleteCamModal'
import AddCamModal from 'pages/FollowList/AddCamModal'
import { AddToBlackListModal, DeleteVehicleModal } from 'pages/BlackList/components'
import EditVehicleModal from 'pages/BlackList/components/EditVehicleModal';
import CamInfoModal from 'pages/Sitemap/components/CamInfoModal'
import ExportPDFModal from 'pages/Violations/Detected/ExportPDFModal'
class ModalWrapper extends Component {
  render() {
    switch (this.props.modalType) {
      case 'LOADING':
        return <Loading />
      case 'DELETE_CAM':
        return <DeleteCamModal />
      case 'ADD_CAM':
        return <AddCamModal />
      case 'ADD_TO_BLACK_LIST':
        return <AddToBlackListModal />
      case 'EDIT_VEHICLE_FROM_BLACK_LIST':
        return <EditVehicleModal />
      case 'DELETE_VEHICLE_FROM_BLACK_LIST':
        return <DeleteVehicleModal />
      case 'CAM_INFO':
        return <CamInfoModal />
      case 'EXPORT_PDF':
        return <ExportPDFModal />
      default:
        return null
    }
  }
}
const mapStateToProps = ({ modal }) => ({
  modalType: modal.modalType,
})

export default connect(mapStateToProps)(ModalWrapper)
