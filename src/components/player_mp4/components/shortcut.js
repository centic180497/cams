import React from 'react'

export default class Shortcut extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.defaultShortcuts = [
      {
        keyCode: 32, //spacebar
        handle: this.togglePlay,
      },
      {
        keyCode: 75, //k
        handle: this.togglePlay,
      },
      {
        keyCode: 67, //c
        handle: this.snapshot,
      },
      {
        keyCode: 70, // f
        handle: this.toggleFullscreen,
      },
      {
        keyCode: 37, // Left arrow
        handle: (player, actions) => {
          if (!player.hasStarted) return
          actions.replay(5, {
            action: 'replay-5',
            source: 'shortcut',
          })
        },
      },
      {
        keyCode: 39, // Right arrow
        handle: (player, actions) => {
          if (!player.hasStarted) {
            return
          }
          actions.forward(5, {
            action: 'forward-5',
            source: 'shortcut',
          }) // Go forward 5 seconds
        },
      },
    ]

    this.shortcuts = [...this.defaultShortcuts]
  }

  componentDidMount() {
    this.mergeShortcuts()
    document.addEventListener('keydown', this.handleKeyPress)
    document.addEventListener('click', this.handleClick)
    document.addEventListener('dblclick', this.handleDoubleClick)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.shorcuts !== this.props.shorcuts) {
      this.mergeShortcuts()
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress)
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('dblclick', this.handleDoubleClick)
  }

  mergeShortcuts = () => {
    const getShortcutKey = ({
      keyCode = 0,
      ctrl = false,
      shift = false,
      alt = false,
    }) => `${keyCode}:${ctrl}:${shift}:${alt}`

    const defaultShortcuts = this.defaultShortcuts.reduce(
      (shortcuts, shortcut) =>
        Object.assign(shortcuts, {
          [getShortcutKey(shortcut)]: shortcut,
        }),
      {},
    )

    const mergedShortcuts = (this.props.shortcuts || []).reduce(
      (shortcuts, shortcut) => {
        const { keyCode, handle } = shortcut
        if (keyCode && typeof handle === 'function') {
          return Object.assign(shortcuts, {
            [getShortcutKey(shortcut)]: shortcut,
          })
        }

        return shortcuts
      },
      defaultShortcuts,
    )
    const gradeShortcut = (s) => {
      let score = 0
      const ps = ['ctrl', 'shift', 'alt']
      ps.forEach((key) => {
        if (s[key]) {
          score++
        }
      })
      return score
    }

    this.shortcuts = Object.keys(mergedShortcuts)
      .map((key) => mergedShortcuts[key])
      .sort((a, b) => gradeShortcut(b) - gradeShortcut(a))
  }

  togglePlay = (player, actions) => {
    if (player.paused) {
      actions.play({
        action: 'play',
        source: 'shortcut',
      })
    } else {
      actions.pause({
        action: 'pause',
        source: 'shortcut',
      })
    }
  }

  toggleFullscreen = (player, actions) => {
    actions.toggleFullscreen(player)
  }

  snapshot = (player, actions) => {
    actions.snapshot(player)
  }

  handleKeyPress = (e) => {
    const { player, actions } = this.props

    if (!player.isActive) return

    // if (document.activeElement) return

    const keyCode = e.keyCode || e.which
    console.log(keyCode)
    const ctrl = e.ctrlKey || e.metaKey
    const shift = e.shiftKey
    const alt = e.altKey

    const shortcut = this.shortcuts.filter((s) => {
      if (!s.keyCode || s.keyCode - keyCode !== 0) return false

      if (
        (s.ctrl !== undefined && s.ctrl !== ctrl) ||
        (s.shift !== undefined && s.shift !== shift) ||
        (s.alt !== undefined && s.alt !== alt)
      ) {
        return false
      }

      return true
    })[0]

    if (shortcut) {
      shortcut.handle(player, actions)
      e.preventDefault()
    }
  }

  canBeClicked = (player, e) => {
    if (
      !player.isActive ||
      e.target.nodeName !== 'VIDEO' ||
      player.readyState !== 4
    )
      return false
    return true
  }

  handleClick = (e) => {
    const { player, actions, clickable } = this.props
    if (!this.canBeClicked(player, e) || !clickable) return

    this.togglePlay(player, actions)
  }

  handleDoubleClick = (e) => {
    const { player, actions, dbclickable } = this.props
    if (!this.canBeClicked(player, e) || !dbclickable) return

    this.toggleFullscreen(player, actions)
  }

  render() {
    return null
  }
}

Shortcut.display = 'Shortcut'
Shortcut.defaultProps = {
  clickable: true
}
