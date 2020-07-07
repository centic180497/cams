import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { isEmpty } from 'lodash'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faMarker, faTrash  } from '@fortawesome/free-solid-svg-icons'
import TextInput from '../../TextInput'
import Tooltip from '@material-ui/core/Tooltip';
import Select from 'react-select'
import Search from './Search'
class SitemapPage extends Component{
    
    showModal = type => event => { 
        this.props.showAddModal(type)
    }
    render(){
        const { isLoading, cameras, match, showEditModal, showDeleteModal } = this.props
        return(
            <div className="container-fluid">
                <Button variant="contained" color="primary"  onClick={this.showModal('ADD_CAMERA')}>Thêm camera</Button>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card table-wrapper">
                            <div className="card-body">
                                <Search />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card table-wrapper">
                            <div className="card-body">
                                <div className="bqv-chart-list">
                                    <h4 className="header-title">DANH SÁCH CAMERA</h4>
                                    { isLoading ? <div className="loader"></div> : <CameraList cameras={cameras} match={match} showEditModal={showEditModal} showDeleteModal={showDeleteModal}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <React.Suspense fallback={<div className="loader"></div>} maxDuration={1500} />
            </div>  
        )
    }
}

const selectStyles = {
    control: (styles) => ({
        ...styles,
        // width: '600px',
        // border: '1px solid #2874A6',
        // boxShadow: '0 0 0 1px #0770cd',
        fontSize: '14px'
    }),
    option: (provided, state) => ({
        ...provided,
        // border: '1px solid #2874A6',
        fontSize: '14px'
    })
}


class CameraList extends Component{
    showModal = type => event => {
        this.props.showEditModal(type)
    }
    handleDelete = type => event => {
        this.props.showDeleteModal(type)
    }
    render(){
        if(!isEmpty(this.props))
            return (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Địa chỉ IP</th>
                            <th>Chức năng</th>
                            <th>Trạng thái</th>
                            <th>Độ phân giải</th>
                            <th>Tốc độ frame</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.cameras.map( (camera, key) => {
                            return (
                            <tr key={key}>
                                <td ><Link to={`${this.props.match.url}/${camera._id}`} className="link-td"> {camera.name} </Link></td>
                                <td>{camera.ip}</td>
                                <td>{camera.modes}</td>
                                <td>{camera.enabled ? 'Đang hoạt động' : 'Disabled'}</td>
                                <td>{camera.width + ' x ' + camera.height}</td>
                                <td>{camera.fps}</td>
                                <td>
                                    <div className="card-extension ml-auto">
                                        <div className="list-button">
                                            <ul className="hover-view">
                                                <Tooltip title="Sửa"><li className="icon-wrapper" onClick={this.showModal({modalType: 'EDIT_CAMERA', id: camera._id})}><Link to={`${this.props.match.url}/${camera._id}`} className="icon-wrapper"><FontAwesomeIcon icon={faMarker} /></Link></li></Tooltip>
                                                <Tooltip title="Xóa"><li className="icon-wrapper" onClick={this.handleDelete({modalType: 'DELETE_CAMERA', id: camera._id})}><FontAwesomeIcon icon={faTrash} /></li></Tooltip>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            )
    }
}

export default SitemapPage