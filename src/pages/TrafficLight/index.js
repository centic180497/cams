import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  AppBar,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import { Remove, Add } from '@material-ui/icons'
import { red, green, yellow } from '@material-ui/core/colors'
import { Formik } from 'formik'
import ModeForm from './ModeForm'
import { fetchConfigTrafficLight, editConfigTrafficLight } from 'actions/action_trafficControl'
import Loading from 'components/Loading'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    paddingTop: 16,
  },
  radioGroup: {
    flexDirection: 'row',
  },
})

class TrafficLight extends Component {
  state = {
    tabValue: 1,
  }

  componentDidMount() {
    this.props.fetchConfigTrafficLight()
  }

  handleClick = () => {}

  handleTabChange = (event, value) => {
    this.setState({
      tabValue: value,
    })
  }

  handleSubmit = values => {
    this.props.editConfigTrafficLight(values)
  }

  render() {
    const { classes, isFetchingConfig, config } = this.props
    const { tabValue } = this.state
    if (isFetchingConfig) {
      return <Loading />
    }
    return (
      <div className={classes.root}>
        <Formik
          enableReinitialize
          initialValues={{
            ...config
          }}
          onSubmit={values => this.handleSubmit(values)}
          render={props => <ModeForm {...props} />}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ trafficControl }) => {
  return {
    isFetchingConfig: trafficControl.api.isFetchingConfig,
    config: trafficControl.trafficLight,
  }
}

export default connect(mapStateToProps, {
  fetchConfigTrafficLight,
  editConfigTrafficLight
})(withStyles(styles)(TrafficLight))
