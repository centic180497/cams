import React, { Component } from 'react';
import { connect } from 'react-redux'
import Configs from './Configs'
import TextInput from '../../TextInput'
import { getCameraInfo } from '../../../actions/action_camera'
import { isEmpty } from 'lodash'

class Info extends Component{

    componentDidMount(){
        console.log(this.props)
        this.props.getCameraInfo(this.props.match.params)
    }

    render(){
        const { match, info, isLoading } = this.props
        const camera ={}
        if(isLoading) return <div className="loader"></div>
        return(
            <div>
                <div className="camera-detail ml-4">
                    <div className="item">
                        <span className="info-title">Địa chỉ IP: </span>
                        <div className="fix-width-input">
                            <TextInput name="ip" value={info.ip} disabled/>
                        </div>
                    </div>
                    <div className="item">
                        <span className="info-title">Port: </span>
                        <div className="fix-width-input">
                            <TextInput name="port" disabled value={info.port} />
                        </div>
                    </div>
                    {/* <div className="item">
                        <span className="info-title">Tên đăng nhập camera: </span>
                        <div className="fix-width-input">
                            <TextInput name="cam_user" disabled value={camera.details ? camera.details.cam_user: ''} onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="item">
                        <span className="info-title">Mật khẩu camera: </span>
                        <div className="fix-width-input">
                            <TextInput name="cam_pass" disabled value={camera.details ? camera.details.cam_pass: ''} onChange={this.onChange}/>
                        </div>
                    </div> */}

                    <div className="item">
                        <span className="info-title">Nhà sản xuất: </span>
                        <div className="fix-width-input">
                            <TextInput disabled value={info.information ? info.information.Manufacturer : ''} />
                        </div>
                    </div>
                    <div className="item">
                        <span className="info-title">Model: </span>
                        <div className="fix-width-input">
                            <TextInput disabled value={info.information ? info.information.Model : ''} />
                        </div>
                    </div>
                    <div className="item">
                        <span className="info-title">Serial Number: </span>
                        <div className="fix-width-input">
                            <TextInput disabled value={info.information ? info.information.SerialNumber : ''} />
                        </div>
                    </div>
                    <div className="item">
                        <span className="info-title">Firmware Version: </span>
                        <div className="fix-width-input">
                            <TextInput disabled value={info.information ? info.information.FirmwareVersion : ''} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({cameras}) => {
    return{
        info: cameras.currentCamera.information,
        isLoading: cameras.isLoading
    }
}

export default connect(mapStateToProps, {
    getCameraInfo
})(Info)