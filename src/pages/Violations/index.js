import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, Switch, Route, withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Divider from '@material-ui/core/Divider'
import indigo from '@material-ui/core/colors/indigo'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { ListItem, Paper, List, Button } from '@material-ui/core'
import Loading from 'components/Loading'

const Detected = React.lazy(() => import('./Detected'))
const Approved = React.lazy(() => import('./Approved'))
const ViolationDetail = React.lazy(() => import('./Detected/ViolationDetail'))

function TabContainer(props) {
  return <Typography></Typography>
}

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
  },
  sidebar: {
    width: 150,
    height: '100%',
  },
  paper: {
    height: '100%',
  },
  button: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  activeButton: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    backgroundColor: indigo[50],
    borderRadius: 4,
  },
  listItem: {
    padding: 8,
  },
  content: {
    flexGrow: 1,
    padding: 8,
  },
  paper: {
    height: '100%',
  },
})

class Violations extends Component {
  render() {
    const { classes, match } = this.props
    return (
      <div className={classes.root}>
        {/* <div className={classes.sidebar}>
          <Paper className={classes.paper}>
            <List>
              <ListItem className={classes.listItem}>
                <Button
                  className={classes.button}
                  component={NavLink}
                  to={`${match.url}/all`}
                  activeClassName={classes.activeButton}
                >
                  Quản lý
                </Button>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Button
                  className={classes.button}
                  component={NavLink}
                  to={`${match.url}/approved`}
                  activeClassName={classes.activeButton}
                >
                  Vi phạm
                </Button>
              </ListItem>
            </List>
          </Paper>
        </div> */}
        <div className={classes.content}>
          <Suspense fallback={<Loading />}>
            <Detected />
            {/* <Route path={`${match.url}/all`} render={() => <Detected />} exact /> */}
            <Route path={`${match.url}/:id`} render={() => <ViolationDetail />} exact />
            {/* <Route path={`${match.url}/approved`} render={() => <Approved />} exact /> */}
          </Suspense>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(withStyles(styles)(Violations)))
