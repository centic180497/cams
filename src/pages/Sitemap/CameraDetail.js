import React, { lazy, Suspense, Component } from 'react'
import { Nav } from 'reactstrap'
import { BrowserRouter as Router, Link, Route, Redirect, NavLink, Switch } from 'react-router-dom'

import Button from '@material-ui/core/Button'

// import { withStyles } from '@material-ui/core/styles';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Icon from '@material-ui/core/Icon';
// import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
// import TextInput from '../../TextInput'
// import { isEmpty, omit } from 'lodash'
// import Select from 'react-select'
// import SaveIcon from '@material-ui/icons/Save'
// import classnames from 'classnames'

import Info from './Info'
// const Info = lazy(() => import('./Info'))
import LiveView from './LiveView'
// const LiveView = lazy(() => import('./LiveView'))
import Locations from './Locations'
// const Locations = lazy(() => import('./Locations'))
import Configs from './Configs'
// const Configs = lazy(() => import('./Configs'))

const styles = theme => ({
  fab: {
    margin: 8,
  },
  extendedIcon: {
    marginRight: 8,
  },
})

const selectStyles = {
  control: styles => ({
    ...styles,
    width: '600px',
    // border: '1px solid #2874A6',
    boxShadow: 'none',
    fontSize: '14px',
  }),
  option: (provided, state) => ({
    ...provided,
    // border: '1px solid #2874A6',
    fontSize: '14px',
  }),
}

const modeOptions = [
  { value: 'Surveillance', label: 'Surveillance' },
  { value: 'Record', label: 'Record' },
  { value: 'Stream', label: 'Stream' },
  { value: 'ALPR', label: 'ALPR' },
]

class CameraDetail extends Component {
  state = {}

  render() {
    const { match } = this.props
    return (
      <div className="container-fluid pt-2">
        <Link to="/dashboard/sitemap">
          <Button variant="contained">
            <KeyboardArrowLeftIcon />
            Quay lại
          </Button>
        </Link>

        <div className="row">
          <div className="col-md-12">
            <div className="card table-wrapper">
              <div className="card-body">
                <div className="camera-detail-wrapper">
                  <div className="camera-sidebar">
                    <Nav>
                      <li className="nav-item">
                        <NavLink to={`${match.url}/live_view`} activeClassName="active" className="nav-link">
                          <p>LIVE VIEW</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={`${match.url}/info`} activeClassName="active" className="nav-link">
                          <p>THÔNG TIN</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={`${match.url}/locations`} activeClassName="active" className="nav-link">
                          <p>VỊ TRÍ</p>
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to={`${match.url}/configs`} activeClassName="active" className="nav-link">
                          <p>CẤU HÌNH</p>
                        </NavLink>
                      </li>
                    </Nav>
                  </div>
                  <div className="camera-detail">
                    <Switch>
                      <Route path={`${match.path}/info`} exact component={Info} />
                      <Route path={`${match.path}/live_view`} exact component={LiveView} />
                      <Route path={`${match.path}/locations`} exact component={Locations} />
                      <Route path={`${match.path}/configs`} exact component={Configs} />
                      <Redirect from={`${match.url}`} to={`${match.url}/live_view`} />
                    </Switch>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CameraDetail
