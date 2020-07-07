import React from 'react'

export function isVideoChild(c) {
  if (c.props && c.props.isVideoChild) {
    return true;
  }
  return c.type === 'source' || c.type === 'track';
}

const find = (elements, func) => elements.filter(func)[0];
// check if two components are the same type
const isTypeEqual = (component1, component2) => {
  const type1 = component1.type;
  const type2 = component2.type;

  if (typeof type1 === 'string' || typeof type2 === 'string') {
    return type1 === type2;
  }

  if (typeof type1 === 'function' && typeof type2 === 'function') {
    return type1.displayName === type2.displayName;
  }

  return false;
};

export function mergeAndSortChildren(
  defaultChildren,
  _children,
  _parentProps,
  defaultOrder = 1,
) {
  const children = React.Children.toArray(_children)
  const { order, ...parentProps } = _parentProps // ignore order from parent
  return children
    .filter(e => !e.props.disabled) // filter the disabled components
    .concat(
      defaultChildren.filter(
        c => !find(children, component => isTypeEqual(component, c)),
      ),
    )
    .map(element => {
      const defaultComponent = find(defaultChildren, c =>
        isTypeEqual(c, element),
      )

      const defaultProps = defaultComponent ? defaultComponent.props : {}
      const props = {
        ...parentProps, // inherit from parent component
        ...defaultProps, // inherit from default component
        ...element.props, // element's own props
      }
      const e = React.cloneElement(element, props, element.props.children)
      return e
    })
    .sort(
      (a, b) =>
        (a.props.order || defaultOrder) - (b.props.order || defaultOrder),
    )
}


export function throttle(callback, limit) {
  let wait = false;
  return () => {
    if (!wait) {
      // eslint-disable-next-line prefer-rest-params
      callback(...arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}