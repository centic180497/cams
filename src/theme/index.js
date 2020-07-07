import { createMuiTheme } from '@material-ui/core/styles'
import overrides from './overrides'
import typography from './typography'

const theme = createMuiTheme({
  overrides,
  typography,
})

export default theme
