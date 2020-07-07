import React, { Component } from 'react';
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({

})

const selectStyles = {
  menu: (styles) => {
    return {
      ...styles,
      zIndex: 2
    }
  }
}
class MySelect extends Component{
  render(){
    const { classes, ...other } = this.props
    return (
      <Select 
        {...other}
        placeholder={false}
        styles={selectStyles}
      />
    )
  }
}

export default withStyles(styles)(MySelect)