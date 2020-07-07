import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  textField: {
    fontSize: '0.875rem',
  },

  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(19px, 14px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '2.5px 14px',
  },
  multiline: {
    padding: 0,
    width: '100%',
  }
})

class TextInput extends Component {
  render() {
    const {
      classes,
      fullWidth,
      ...other
    } = this.props
    return ( 
      <TextField 
        {...other}
        fullWidth={fullWidth}
        margin = "none"
        variant = "outlined"
        InputLabelProps = {{
          classes: {
            root: classes.inputLabel
          },
        }}
        InputProps = {{
          classes: {
            // root: classes.inputProps,
            multiline: classes.multiline
          },
          inputProps: {
            className: classes.inputProps,
          },
        }}
        className = { classes.textField }
      />
    )
  }
}

export default withStyles(styles)(TextInput)