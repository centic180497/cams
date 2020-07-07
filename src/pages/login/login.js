import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { Formik } from 'formik'
import * as yup from 'yup'
import _ from 'lodash'

import * as GlobalActions from 'actions/global_actions'
import logoCentic from '../../assets/images/logo_copy.png'
import logoVanLang from '../../assets/images/logo_vanlang.jpg'
import banner from '../../assets/images/banner.png'

import LoginForm from './LoginForm'
import { logIn } from '../../actions/action_authetication'
import './login.scss'
import { Typography } from '@material-ui/core';

const loginSchema = yup.object().shape({
  username: yup.string().required('Nhập tên đăng nhập !'),
  password: yup.string().required('Nhập mật khẩu !'),
})

const styles = theme => ({
  root: {
    height: '100vh',
    flexGrow: 1
  },
  text: {
    fontSize: 24,
    fontWeight: 400
  },
  right: {
    borderRadius: 0,
    height: '100%',
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  banner: {
    paddingBottom: 100,
  },
  bannerImg: {
    width: '100%'
  },

  logo: {
    textAlign: 'center'
  },
  logoImg: {
    height: 30,
    padding: 4
  }
})

class LoginPage extends Component {

  componentDidMount(){
    if(!_.isEmpty(this.props.user)){
      // GlobalActions.redirectUserToDashboard()
    }
    
  }

  _onSubmit = values => {
    this.props.logIn(values)
  }

  render() {
    const { classes, isFetching, authenticated } = this.props
    
    if (authenticated) {
      return <Redirect to="/dashboard" />
    }
    return (
      <div className="login-page">
        <Grid container spacing={0} className={classes.root}>
          <Grid item md={9}>
          </Grid>

          <Grid item md={3}>
            <Paper className={classes.right}>
              <div className={classes.banner}>
                <img src={banner} className={classes.bannerImg} alt="CA Quảng Nam"/>
              </div>
              <div className={classes.content}>
                <Typography align="center" className={classes.text}>HỆ THỐNG CAMERA GIÁM SÁT</Typography>
                <Formik
                  initialValues={{ username: '', password: '' }}
                  validationSchema={loginSchema}
                  validateOnChange={false}
                  onSubmit={values => this._onSubmit(values)}
                  render={props => (
                    <LoginForm {...props} isFetching={isFetching} />
                  )}
                />
              </div>
              <div className={classes.logo}>
                Xây dựng bởi
                <img src={logoCentic} className={classes.logoImg} alt="Centic logo" /> &
                <img src={logoVanLang} className={classes.logoImg} alt="Vanlang logo" /> 
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(LoginPage)
