import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import SearchCamForm from './SearchCamForm'

const styles = theme => ({
  root: {
    padding: '10px 10px',
    // flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '0.825rem',
    fontWeight: 500,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 12px',
  },
})

class SearchCam extends Component {
  
  componentDidMount(){
    
  }

  _onSubmit = values => {}
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              TÌM KIẾM NÂNG CAO
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Formik
              initialValues={{
                string: '',
                province: null,
                district: [],
                commune: [],
                group: [],
              }}
              onSubmit={values => {
                this._onSubmit(values)
              }}
              render={props => <SearchCamForm {...props} />}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    )
  }
}

export default connect()(withStyles(styles)(SearchCam))
