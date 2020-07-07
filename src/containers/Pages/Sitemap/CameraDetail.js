import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pages } from '../../../components'
// import CameraDetail from '../../../components/Pages/Sitemap/CameraDetail'

import * as CameraActions from '../../../actions/action_camera'
import * as ModalActions from '../../../actions/action_modal'
// console.log(<Pages.CameraDetail />)
class CameraDetail extends Component{
    componentDidMount(){
        // this.props.getCameraData(this.props.match.params)
    }
    render(){
        return(
            <Pages.CameraDetail {...this.props} />
        )
    }
}

const mapStateToProps = ({cameras}) => ({
    camera: cameras.currentCamera,
    isLoading: cameras.isLoading,
    provinces: cameras.provinces,
    districts: cameras.districts,
    communes: cameras.communes,
})

const mapDispatchToProps = (dispatch) => ({
    // getCameraData: (id) => dispatch(CameraActions.getCamera(id)),
    // loadDistrict: (id) => dispatch(CameraActions.loadDistrict(id)),
    // loadCommune: (id) => dispatch(CameraActions.loadCommune(id)),
    // editCamera: (id, data) => dispatch(CameraActions.editCamera(id, data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CameraDetail))

