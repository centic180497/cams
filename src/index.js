import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Notifier from './components/Notifier'
import store from './store'
import 'react-perfect-scrollbar/dist/css/styles.css'
import 'leaflet/dist/leaflet.css'
import './assets/styles/app.scss'
import Root from 'pages/root'

import { ThemeProvider } from '@material-ui/core'
import { CssBaseline } from '@material-ui/core'
import theme from 'theme'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={6}
        autoHideDuration={3000}
        action={[
          <IconButton key={Math.random()} aria-label="Close" color="inherit">
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Root />
        <Notifier />
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('centic'),
)
