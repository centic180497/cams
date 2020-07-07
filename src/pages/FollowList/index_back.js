import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import Loading from '../../components/Loading'
import { isEmpty, chunk } from 'lodash'
import {
  getFollowList,
  exitFollowListPage,
} from '../../actions/action_followList'
import RowCamera from './RowCamera'

const styles = theme => ({})

class FollowList extends Component {
  state = {
    wrapper_height: 0,
    wrapper_width: 0,
  }

  componentDidMount() {
    this.getInnerWindow()
    this.props.getFollowList()
    window.addEventListener('resize', this.getInnerWindow)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getInnerWindow)
  }

  getInnerWindow = () => {
    const height = window.innerHeight - 60,
      width = window.innerWidth - 50
    if (height / width <= 9 / 16) {
      console.log('awfnknwnwf')
      this.setState({
        wrapper_height: height,
        wrapper_width: (height * 16) / 9,
      })
    } else {
      this.setState({
        wrapper_height: (width * 9) / 16,
        wrapper_width: width,
      })
    }
  }

  render() {
    const sizeWrapper = {
      height: this.state.wrapper_height,
      width: this.state.wrapper_width,
      // backgroundColor: 'green',
      overflow: 'hidden',
      padding: '0',
      margin: '5px 0',
    }
    const { cameras, listSize, isFetching } = this.props
    const list_camera = chunk(cameras, Math.sqrt(parseInt(listSize)))
    return (
      <div className="container-fluid" style={{ padding: '0' }}>
        <div className="row follow-list-page">
          <Size />    
          <div style={sizeWrapper}>
            {isFetching && <Loading />}
            <WrapperPlayer>
              <Player streamURL="http://10.49.46.54:80/livestream/hls/221/index.m3u8" />
            </WrapperPlayer>
            {!isEmpty(list_camera) &&
              list_camera.map((camera, index) => (
                <WrapperPlayer key={index}>
                  <Player streamURL={camera.stream_url} />
                </WrapperPlayer>
              ))}
            {!isEmpty(list_camera) &&
              list_camera.map((cameras, index) => (
                <RowCamera cameras={cameras} key={index} />
              ))}
          </div>
          <Pagination />   
        </div>
      </div>
    )
  }
}

FollowList.propTypes = {}

const mapStateToProps = ({ followList }) => ({
  isFetching: followList.isFetching,
  cameras: followList.cameras,
  listSize: followList.listSize,
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getFollowList: getFollowList,
    },
  )(withStyles(styles)(FollowList)),
)
