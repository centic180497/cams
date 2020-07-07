import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Loading from '../../components/Loading'
import ListItem from './components/ListItem'
import VehicleHistory from './components/VehicleHistory'

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: '0', flexGrow: '1' }}
    >
      {children}
    </Typography>
  )
}

class BlackList extends Component {
  constructor() {
    super()
    this.state = {
      tabValue: 0,
    }
  }
  render() {
    const { classes, theme, match } = this.props
    const { tabValue } = this.state
    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Danh sách" />
              {/* <Tab label="Chi tiết" /> */}
            </Tabs>
          </AppBar>
          <Suspense fallback={<Loading />}>
            {tabValue === 0 && (
              <TabContainer dir={theme.direction}>
                <ListItem />
              </TabContainer>
            )}
          </Suspense>
        </div>
        <div className={classes.right}>
          {/* <Route path={`${match.url}/cd`} 
            render={() => <div>cd</div>}
          /> */}
          <Route
            path={`${match.url}/:plateNumber`}
            component={VehicleHistory}
            // exact
            // render={props => <div>ABC</div>}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect()(withStyles(styles, { withTheme: true })(BlackList)),
)
