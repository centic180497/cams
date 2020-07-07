import React, { Component, Fragment } from 'react';
import SearchResult from './SearchResult'
import Search from './Search'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    root: {

    }
})

class Filter extends Component {
  render(){
    return(
      <Fragment>
        <Search/>
        <SearchResult isManageCam/>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Filter)