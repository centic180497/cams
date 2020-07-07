import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCog, faEye } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
// import snapshot from '../assets/images/snapshot/236_resize.jpeg'

class CameraList extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="camera-result">
        <h6>KẾT QUẢ TÌM KIẾM</h6>
        <ul>
          {this.props.cameras &&
            this.props.cameras.map((camera, index) => {
              return <CameraItem camera={camera} key={index} />
            })}
        </ul>
      </div>
    )
  }
}

class CameraItem extends Component {
  handleSubcribe = e => {}
  render() {
    const { camera } = this.props
    return (
      <li>
        <div className="card">
          <div className="card-body camera-item">
            <div className="camera-snapshot">
              <img src={`http://10.49.46.46:3000${camera.snapshot_image}`} width="80px" />
            </div>
            <div className="camera-info">
              <div className="camera-name">{camera.name}</div>
              <div className="camera-address">{camera.location.formated_address}</div>
              <div className="camera-action">
                <ul>
                  <li>
                    <Link to={`/dashboard/camera/${camera._id}/edit`}>
                      <button title="Chi tiết">
                        <FontAwesomeIcon icon={faCog} />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button onClick={this.handleSubcribe} title="Theo dõi">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default CameraList
