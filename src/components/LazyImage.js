import React, { Component } from 'react';

class LazyImage extends Component{
  render(){
    return (
      <img
        src={this.props.src}
        onLoad={this.handleImgLoaded}
        ref={el => this.img = el}
      />
    )
  }
}

export default  LazyImage