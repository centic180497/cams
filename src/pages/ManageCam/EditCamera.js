import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles, withTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import EditConnect from './EditConnect'
import EditParams from './EditParams'
import EditFunctions from './EditFunctions'

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '0',flexGrow: '1' }}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height:'100%',
    flexGrow: 1,
  },
  remain: {
    display: 'flex',
    flexGrow: 1,
  },
  tab: {
    width: '33.333333%',
    minWidth: 130
  }
})  

class EditCamera extends Component{
  state = {
    value: 0
  }
  
  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render(){
    const { classes, theme } = this.props
    const { value } = this.state
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Kết nối" className={classes.tab}/>
            <Tab label="Tham số" className={classes.tab}/>
            <Tab label="Chức năng" className={classes.tab}/>
          </Tabs>
        </AppBar>
        <div className={classes.remain}>
          {
            value === 0 && 
              <TabContainer dir={theme.direction}>
                <div className={classes.wrapper}>
                  <EditConnect />
                </div>
              </TabContainer>
          }
          {
            value === 1 && 
              <TabContainer dir={theme.direction}>
                <div className={classes.wrapper}>
                  <EditParams />
                </div>
              </TabContainer>
          }
          {
            value === 2 && 
              <TabContainer dir={theme.direction}>
                <div className={classes.wrapper}>
                  <EditFunctions />
                </div>
              </TabContainer>
          }
        </div>
        
      </div>
    )
  }
}

export default connect()(withStyles(styles, { withTheme: true})(EditCamera))
