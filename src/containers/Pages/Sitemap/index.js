import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as CameraActions from '../../../actions/action_camera'
import * as ModalActions from '../../../actions/action_modal'
import * as MapActions from '../../../actions/action_map'
import * as UIActions from '../../../actions/action_ui'
import { Pages } from '../../../components'

class SitemapPage extends Component{
    render(){
        return(
            <Pages.SitemapPage {...this.props} />
        )
    }
}
const mapStateToProps = ({cameras, map, ui}) => ({
    cameras: cameras.cameras,
    isLoading: cameras.isLoading,
    infoWindow: map.showInfoWindow,
    cameraFilterSidebar: ui.cameraFilterSidebar
})

const mapDispatchToProps = (dispatch) => ({
    getListCameras: dispatch(CameraActions.getCameras()),
    showAddModal: (modalType) => dispatch(ModalActions.showAddModal(modalType)),
    showEditModal: (data) => dispatch(ModalActions.showEditModal(data)),
    showDeleteModal: (data) => dispatch(ModalActions.showDeleteModal(data)),
    showInfoWindow: (id) => dispatch(MapActions.showInfoWindow(id)),
    closeInfoWindow: () => dispatch(MapActions.closeInfoWindow()),
    toggleFilter: () => dispatch(UIActions.toggleFilter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SitemapPage)