import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { closeModal } from '../../actions/action_modal'

ReactModal.setAppElement('#app');


class Modal extends Component{
    constructor(props){
        super(props)
        this.closeModal = this.closeModal.bind(this)
    }

    closeModal = modalType => event =>{
        this.props.dispatch(closeModal(modalType))
    }

    render(){
        // const customStyles = {
        //     overlay: {
        //         backgroundColor: 'rgba(0, 0, 0, .7)',
        //         zIndex: '3'
        //     }
        // }
        const { title, modalType } = this.props
        return(
            <ReactModal {...this.props} modalType={modalType}>
                <div className="CenticModal_Header">
                    <span className="title">{title}</span>
                    <button title="Close" onClick={this.closeModal(modalType)} className="close-modal">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                {this.props.children}
            </ReactModal>
        )
    }
}

export default connect()(Modal)