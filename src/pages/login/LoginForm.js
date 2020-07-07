import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextInput from '../../components/TextInput'
import _ from 'lodash'

const styles = theme => ({
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
  process: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
})

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
  }

  _onInputChange = event => {
    event.persist()
    this.props.handleChange(event)
  }

  render() {
    const { 
      classes, 
      handleSubmit, 
      errors = {},
      isFetching
    } = this.props
    
    return (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="card-body">
          <div className="form-group">
            <TextInput 
              label="Tên đăng nhập"
              name="username"
              fullWidth
              onChange={this._onInputChange}
              error={_.has(errors,'username')}
              helperText={errors.username}
            />
          </div>
          <div className="form-group">
            <TextInput
              label="Mật khẩu"
              name="password"
              type="password"
              fullWidth
              onChange={this._onInputChange}
              error={_.has(errors,'password')}
              helperText={errors.password}
            />
          </div>
          <div className="text-center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isFetching}
            >
              Đăng nhập
              { isFetching && <CircularProgress size={24} className={classes.process} color="primary"/> }
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

export default (withStyles(styles)(LoginForm))
