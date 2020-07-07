import React from 'react'

export function isVideoChild(c) {
  if (c.props && c.props.isVideoChild) return true

  return c.type === 'source' || c.type === 'track'
}

export function throttle(callback, limit) {
  let wait = false
  return () => {
    if (!wait) {
      callback(...arguments)
      wait = true

      setTimeout(() => {
        wait = false
      }, limit)
    }
  }
}

const find = (elements, func) => elements.filter(func)[0]

// check if two components are the same type
const isTypeEqual = (component1, component2) => {
  const type1 = component1.type
  const type2 = component2.type

  if (typeof type1 === 'string' || typeof type2 === 'string') {
    return type1 === type2
  }

  if (typeof type1 === 'function' && typeof type2 === 'function') {
    return type1.displayName === type2.displayName
  }

  return false
}

// merge default children
// sort them by `order` property
// filter them by `disabled` property
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

const isNaN = Number.isNaN || (value => value !== value)

export function formatTime(seconds = 0, guide = seconds) {
  let s = Math.floor(seconds % 60)
  let m = Math.floor((seconds / 60) % 60)
  let h = Math.floor(seconds / 3600)
  const gm = Math.floor((guide / 60) % 60)
  const gh = Math.floor(guide / 3600)

  if (isNaN(seconds) || seconds === Infinity) {
    h = '-'
    m = '-'
    s = '-'
  }

  h = h > 0 || gh > 0 ? `${h}:` : ''
  m = `${(h || gm >= 10) && m < 10 ? `0${m}` : m}:`
  s = s < 10 ? `0${s}` : s

  return h + m + s
}

export const mediaProperties = [
  'buffered',
  'controller',
  'controls',
  'controlsList',
  'crossOrigin',
  'currentSrc',
  'currentTime',
  'defaultMuted',
  'defaultPlaybackRate',
  'disableRemotePlayback',
  'duration',
  'ended',
  'error',
  'loop',
  'mediagroup',
  'muted',
  'networkState',
  'paused',
  'playbackRate',
  'played',
  'preload',
  'readyState',
  'seekable',
  'seeking',
  'skinId',
  'src',
  'srcObject',
  'textTracks',
  'videoHeight',
  'videoTracks',
  'videoWidth',
  'volume',
]
