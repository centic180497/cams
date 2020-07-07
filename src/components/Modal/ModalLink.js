import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactModal from 'react-modal'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: '3'
    }
}

class ModalLink extends Component{
    constructor(){
        super()
        this.closeModal = this.closeModal.bind(this)
    }
    
    closeModal(){

    }

    render(){
        
        return(
            <ReactModal {...this.props} style={customStyles} isOpen={true} >
                
            </ReactModal>
        )
    }
}

export default ModalLink