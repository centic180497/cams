import React from 'react'


export default class BigPlayButton extends React.Component {
  
  handleClick = () => {

  }

  render(){
    return (
      <div 
        tabIndex="0"
        onClick={this.handleClick}
      >

      </div>
    )
  }
}

BigPlayButton.display = 'BigPlayButton'