import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCamera } from '../../../actions/action_camera'
import Camera from '../../../views/Pages/Sitemap/Camera'
const mapStateToProps = ({cameras}) => {
    return {
        detail: cameras.currentCamera
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCamera: (params) => dispatch(getCamera(params))
    }
}
class CameraContainer extends Component{

    componentDidMount(){
        const { params } = this.props.match
        this.props.getCamera(params)
    }

    render(){
        return(
            <Camera {...this.props} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraContainer)
