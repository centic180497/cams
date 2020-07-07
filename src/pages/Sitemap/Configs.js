import React, { Component } from 'react';
import { connect,  } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TextInput from '../../TextInput'
import Select from 'react-select'
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch  } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash'
import { getCameraConfigs, editCameraConfigs } from '../../../actions/action_camera'
const selectStyles = {
    control: (styles) => ({
        ...styles,
        width: '600px',
        // border: '1px solid #2874A6',
        boxShadow: 'none',
        fontSize: '14px'
    }),
    option: (provided, state) => ({
        ...provided,
        // border: '1px solid #2874A6',
        fontSize: '14px'
    })
}

const modeOptions = [
    { value: 'Surveillance', label: 'Surveillance' },
    { value: 'Record', label: 'Record' },
    { value: 'Stream', label: 'Stream' },
    { value: 'ALPR', label: 'ALPR' },
]
let modes = []
let resolutionAvailable = []
class Configs extends Component{
    state ={}
    componentDidMount(){
        this.props.getCameraConfigs(this.props.match.params)
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    handleSwitch = () => {

    }
    render(){
        const { isLoading, configs, match, editCameraConfigs, isProcessing } =  this.props
        let resolution = {}, max_keep_days, record_file_duration
        if(!isEmpty(configs)){
            console.log(configs)
            modes = configs.modes.map(mode => {
                return { value: mode, label: mode }
            })
            resolutionAvailable = configs.details.resolution_available.map( resolution => {
                return {
                    value: [resolution.width, resolution.height],
                    label: resolution.width + ' x ' + resolution.height
                }
            }) 
            resolution = {
                value: [configs.width, configs.height],
                label: configs.width + ' x ' + configs.height
            }
            max_keep_days = configs.details.max_keep_days
            record_file_duration = configs.details.record_file_duration
        }
        if(isLoading) return <div className="loader"></div>
        return <ConfigsForm 
                    name={configs.name}
                    modes={modes}
                    enabled={configs.enabled}
                    max_keep_days={max_keep_days}
                    record_file_duration={record_file_duration}
                    resolution={resolution}
                    resolutionAvailable={resolutionAvailable}
                    fps={configs.fps}
                    bitrate={configs.bitrate}
                    match={match}
                    editCameraConfigs={editCameraConfigs}
                    isProcessing={isProcessing}
            />
    }
}

class ConfigsForm extends Component{
    state = {
        name: this.props.name,
        modes: this.props.modes,
        enabled: this.props.enabled,
        max_keep_days: this.props.max_keep_days,
        record_file_duration: this.props.record_file_duration,
        resolution: this.props.resolution,
        fps: this.props.fps,
        bitrate: this.props.bitrate,
    }
    handleSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
    }
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onModesChange = modes => {
        if(modes && modes !== null && modes !== 'undefined'){
            this.setState({
                modes: modes.map(mode => {
                    return mode
                }),
                errors: { ...this.state.errors, modes: ''}
            })
        }else{
            this.setState({
                modes: []
            })
        }
    }
    onResolutionChange = resolution => {
        if(resolution && resolution !== null && resolution !== 'undefined'){
            this.setState({
                resolution: resolution
            })
        }else{
            this.setState({
                resolution: ''
            })
        }
    }
    editCameraConfigs = () => {
        this.props.editCameraConfigs(this.props.match.params, this.state)
    }

    render(){
        const { resolutionAvailable, isProcessing } = this.props
        return(
            <div>
            <div className="camera-detail ml-4">
                <div className="item">
                    <span className="info-title">Tên: </span>
                    <div className="fix-width-input">
                        <TextInput name="name" placeholder="Tên camera" value={this.state.name}  onChange={this.onChange}/>
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Chức năng:</span>
                    <div className="fix-width-input">
                        <Select name="modes" isClearable={true} isMulti placeholder="Chức năng" options={modeOptions} styles={selectStyles} 
                        value={this.state.modes} onChange={this.onModesChange} />
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Enabled:</span>
                    <div className="fix-width-input">
                        <Switch checked={this.state.enabled} onChange={this.handleSwitch('enabled')} color="primary"/>
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Thời gian file video (phút):</span>
                    <div className="fix-width-input">
                        <TextInput name="record_file_duration" placeholder="Thời gian file video"  value={this.state.record_file_duration} onChange={this.onChange} />
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Thời gian lưu trữ file video (ngày):</span>
                    <div className="fix-width-input">
                        <TextInput name="max_keep_days" placeholder="Thời gian lưu trữ file video" value={this.state.max_keep_days} onChange={this.onChange} />
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Độ phân giải:</span>
                    <div className="fix-width-input">
                    <Select name="resolution" placeholder="Độ phân giải" options={resolutionAvailable} styles={selectStyles}
                    onChange={this.onResolutionChange} value={this.state.resolution}/>
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Tốc độ Frame:</span>
                    <div className="fix-width-input">
                        <TextInput name="fps" placeholder="Tốc độ frame" value={this.state.fps}  onChange={this.onChange} />
                    </div>
                </div>
                <div className="item">
                    <span className="info-title">Bitrate: </span>
                    <div className="fix-width-input">
                        <TextInput name="bitrate" placeholder="Bitrate" value={this.state.bitrate}  onChange={this.onChange} />
                    </div>
                </div>
                <Button variant="contained" color="primary" onClick={this.editCameraConfigs} disabled={isProcessing}>
                    {isProcessing ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Lưu'}
                </Button>
            </div>
            
            </div>
        )
    }
}

const mapStateToProps = ({cameras}) => {
    return {
        isLoading: cameras.isLoading,
        isProcessing: cameras.isProcessing,
        configs: cameras.currentCamera.configs
    }
}

export default withRouter(connect(mapStateToProps, {
    getCameraConfigs,
    editCameraConfigs
})(Configs))