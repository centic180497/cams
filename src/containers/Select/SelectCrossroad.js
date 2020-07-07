import React, { Component } from 'react';
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/lib/Async'

class SelectCrossroad extends Component{
    render(){
        return(
            <AsyncSelect />
        )
    }
}

export default connect()(SelectCrossroad)
