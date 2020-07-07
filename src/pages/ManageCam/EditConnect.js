import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Formik } from 'formik'
import Loading from '../../components/Loading'
import EditConnectForm from './EditConnectForm'
import {
  changeCamConnectionParams,
  fetchCamConnection,
  editCamConnection,
  focusOnCam,
  focusFirstCam,
} from '../../actions/action_camera'
import { toggleEditCamMap } from '../../actions/action_map'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    // paddingLeft: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  formContent: {
    height: 'auto',
    display: 'flex',
    flexGrow: 1,
  },
  formGroup: {
    marginTop: 20,
    marginRight: 10,
  },
  actionButton: {
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 5,
  },
  formHelperText: {
    margin: '8px 12px 0',
  },
  textField: {
    fontSize: '0.875rem',
    width: 'calc(50% - 5px)',
  },

  inputProps: {
    fontSize: '0.875rem',
    padding: '12px 14px',
  },
  inputLabel: {
    fontSize: '0.875rem',
    transform: 'translate(19px, 14px) scale(1)',
  },
  input: {
    display: 'flex',
    fontSize: '0.875rem',
    padding: '2.5px 0 2.5px 6px',
  },
})

const selectStyles = {
  menu: styles => {
    return {
      ...styles,
      zIndex: 2,
    }
  },
}

class EditConnect extends Component {
  componentDidMount() {
    const { focusedCam, cams = [] } = this.props
    if (focusedCam === -1 && cams.length > 0) {
      this.props.focusFirstCam({
        center: {
          lat: cams[0].lat,
          lng: cams[0].lng,
        },
        zoom: 15,
        id: cams[0].id,
      })
      this.props.toggleEditCamMap()

      this.props.fetchCamConnection(cams[0].id)
    } else {
      this.props.toggleEditCamMap()
      this.props.fetchCamConnection(focusedCam)
    }
  }

  componentWillUnmount() {
    this.props.toggleEditCamMap()
  }

  onChange = name => event => {
    this.props.changeCamConnectionParams({
      [name]: event.target.value,
    })
  }

  changeSelect = name => value => {
    this.props.changeCamConnectionParams({
      [name]: value,
    })
  }

  handleSubmit = values => {
    const { focusedCam} = this.props
    this.props.editCamConnection(focusedCam, values)
  }

  render() {
    const { classes, isFetching, editConnectionData = {} } = this.props
    return (
      <div className={classes.root}>
        {isFetching ? (
          <Loading />
        ) : (
          <Formik
            enableReinitialize
            initialValues={{ ...editConnectionData }}
            onSubmit={values => this.handleSubmit(values)}
            render={props => <EditConnectForm {...props} />}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ cameras, political }) => ({
  // id: cameras.currentCam.id,
  cams: cameras.cameras,
  focusedCam: cameras.focusedCam,
  isFetching: cameras.isFetching,
  errors: cameras.errors,
  editConnectionData: cameras.editCam.connection,
  focusedCam: cameras.focusedCam,
  currentConnection: cameras.currentCam.connection,
  provinceOptions: political.provinces,
  districtOptions: political.districts,
  communeOptions: political.communes,
  groupOptions: political.groups,
})

export default connect(mapStateToProps, {
  changeCamConnectionParams: changeCamConnectionParams,
  // getCamConnection: getCamConnection,
  fetchCamConnection,
  focusOnCam,
  focusFirstCam,
  editCamConnection: editCamConnection,
  toggleEditCamMap: toggleEditCamMap,
})(withStyles(styles)(EditConnect))
