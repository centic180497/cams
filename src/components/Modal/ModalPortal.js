const modalRoot = document.getElementById('modal-root')

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
// const ReactModalPortal = 
const container = document.createElement('div')
container.className = 'ModalPortal'
const overlay = document.createElement('div')
overlay.className = 'ModalPortal_Overlay'
const content = document.createElement('div')
content.className = 'ModalPortal_Content'
overlay.appendChild(content)
container.appendChild(overlay)


class ModalPortal extends Component{
    
    constructor(props){
        super(props)
        this.el = document.createElement('div')
    }

    componentDidMount(){
        modalRoot.appendChild(container)
    }

    componentWillUnmount(){
        modalRoot.removeChild(container)
    }

    render(){
        return ReactDOM.createPortal(this.props.children, container)
    }

}

export default ModalPortal