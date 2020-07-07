import React from 'react'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

import store from 'stores/redux_store'
import { browserHistory } from 'utils/browser_history'

import Root from 'components/root'