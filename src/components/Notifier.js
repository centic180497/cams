import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withSnackbar } from 'notistack'
import { enqueueSnackbar, removeSnackbar }  from '../actions/action_snackbar'

class Notifier extends Component{
    
  displayed = []
    
  storeDisplayed = (id) => {
    this.displayed = [...this.displayed, id]
  }
    
  shouldComponentUpdate({ notifications: newSnacks = [] }){
    const { notifications: currentSnacks } = this.props;
    let notExits = false;
    for(let i = 0; i < newSnacks.length; i+= 1){
      if(notExits) continue
      notExits = notExits || !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExits
  }

  componentDidUpdate(){
    const { notifications = [] } = this.props
    notifications.map(notification => {
      if(this.displayed.includes(notification.key)) return
      this.props.enqueueSnackbar(notification.message, notification.options);
      this.storeDisplayed(notification.key)
      this.props.removeSnackbar(notification.key)
    })
  }

  render(){
    return null
  }
}

const mapStateToProps = ({snackbar}) => ({
  notifications: snackbar.notifications
})

export default connect(mapStateToProps, {
  enqueueSnackbar: enqueueSnackbar,
  removeSnackbar: removeSnackbar
})(withSnackbar(Notifier))