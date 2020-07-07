import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({

})

class ErrorBoundary extends Component{
    
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info){
      
  }

  render(){
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>
    }
    return this.props.children
  }
}

export default withStyles(styles)(ErrorBoundary)