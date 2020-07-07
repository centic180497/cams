import React, { Component } from 'react'
import classNames from 'classnames'
import FullscreenToggle from './FullscreenToggle'
import FollowToggle from './FollowToggle';
import PlayToggle from './PlayToggle'
import { mergeAndSortChildren } from '../../utils';

class ControlBar extends Component{

  getDefaultChildren = () => {
    return [
      <PlayToggle key="play-toggle" order={1} />,
      <FullscreenToggle key="fullscreen-toggle"  order={4} />,
    ]
  }

  getChildren = () => {
    const children = React.Children.toArray(this.props.children);
    const defaultChildren = this.props.disableDefaultControls
      ? []
      : this.getDefaultChildren();
    const { className, ...parentProps } = this.props; // remove className
    return mergeAndSortChildren(defaultChildren, children, parentProps);
  }

  render(){
    
    const {
      manager
    } = this.props

    const children = this.getChildren();

    return (
      <div className="control-bar">
        {children}
        {/* <div className="control-bar__left">
          <PlayToggle {...this.props}/>
        </div> 
        <div className="control-bar__right">
          <FollowToggle {...this.props}/>
          <FullscreenToggle {...this.props}/>
        </div> */}
      </div>
    )
  }
}

export default ControlBar