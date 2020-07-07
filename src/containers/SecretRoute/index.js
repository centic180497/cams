import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

const SecretRoute = ({ component: Component, ...props}) => {
    let isAuthenticated = props.authenticated
    if(isAuthenticated){
        return(
            <Route {...props} component={Component} />
        )
    }else{
        return <Redirect to='/' />
    }
}

const mapStateToProps = ({user}) => {
    return {
        authenticated: user.authenticated
    }
}

export default connect(mapStateToProps)(SecretRoute)