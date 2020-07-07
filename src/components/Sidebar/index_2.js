import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon } from '@material-ui/core'
import {
  Map as MapIcon,
  AppsOutlined as AppsOutlinedIcon,
  Search as SearchIcon,
  ListAlt as ListAltIcon,
  Description as DescriptionIcon,
  DepartureBoardOutlined as DepartureBoardOutlinedIcon,
} from '@material-ui/icons'
import ArrowTooltip from 'components/TooltipWrapper'

const styles = theme => ({
  root: {
    width: 55,
    background: 'white',
    borderRight: '1px solid #E3E3E3',
    zIndex: 1,
    position: 'fixed',
    top: 50,
    bottom: 0,
  },
  container: {
    paddingLeft: 2,
    paddingRight: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    flexGrow: 1,
    flexShrink: 1,
  },
  bottom: {
    flexGrow: 0,
  },
  listItem: {
    cursor: 'pointer',
  },
})

class Sidebar extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.top}>
            <List component="div">
              <ArrowTooltip title="Bản đồ" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/sitemap"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <MapIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
              <ArrowTooltip title="Danh sách theo dõi" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/follow_list"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <AppsOutlinedIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
              <ArrowTooltip title="Tìm kiếm phương tiện" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/search_vehicles"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <SearchIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
              <ArrowTooltip title="Danh sách đen" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/blacklist"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <ListAltIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
              <ArrowTooltip title="Vi phạm" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/violations"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <DescriptionIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
              <ArrowTooltip title="Lưu lượng" placement="right">
                <ListItem
                  component={NavLink}
                  to="/dashboard/flow"
                  className={classes.listItem}
                  activeClassName={classes.activeListItem}
                >
                  <ListItemIcon className={classes.listItemIcon}>
                    <DepartureBoardOutlinedIcon className={classes.icon} />
                  </ListItemIcon>
                </ListItem>
              </ArrowTooltip>
            </List>
          </nav>
          <nav className={classes.bottom}>
            <List component="div" className={classes.bottomList}>
              <ListItem class>

              </ListItem>
            </List>
          </nav>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Sidebar)
