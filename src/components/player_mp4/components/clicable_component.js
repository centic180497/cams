import React from 'react'
import classNames from 'classnames'

export default class ClickableComponent extends React.Component {
  componentWillUnmount(e) {
    this.handleBlur(e)
  }

  handleClick = (event) => {
    const { onClick} = this.props
    onClick(event)
  }

  handleFocus = () => {

  }

  handleBlur = () => {
    
  }

  render() {
    const Tag = this.props.tagName
    const props = { ...this.props }
    delete props.tagName
    delete props.className

    return (
      <Tag
        className={classNames(this.props.className)}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...props}
      />
    )
  }
}

ClickableComponent.displayName = 'ClickableComponent'
ClickableComponent.defaultProps = {
  tagName: 'div',
}
