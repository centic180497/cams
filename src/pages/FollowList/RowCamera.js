import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Player from '../../components/Player/components/Player'
import { PlayerHls } from 'components/player_hls'
// import  { Player } from '../../components/PlayerHls'
import Loading from '../../components/Loading'
import WrapperPlayer from './WrapperPlayer'
import { isEmpty } from 'lodash'
import EmptyPlayer from './EmptyPlayer'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {},
  control: {
    padding: 8 * 2,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  rowHalf: {
    height: '50%',
  },
  rowOneThird: {
    height: '33.333333%',
  },
  rowQuarter: {
    height: '25%',
  },
})

class RowCamera extends Component {
  state = {}
  componentDidMount() {}

  renderEmptyPlayer = amount => {
    if (amount > 0) {
      let emptyPlayer = []
      for (let i = 0; i < amount; i++) {
        emptyPlayer.push(<EmptyPlayer key={Math.random()} />)
      }
      return emptyPlayer
    }
    return
  }

  render() {
    const { classes, empty, cams = [], listSize } = this.props

    if (Boolean(empty)) {
      return (
        <div
          className={classNames(classes.row, {
            [classes.rowHalf]: listSize === 4,
            [classes.rowOneThird]: listSize === 9,
            [classes.rowQuarter]: listSize === 16,
          })}
        >
          {this.renderEmptyPlayer(Math.sqrt(listSize))}
        </div>
      )
    }

    const remainEmptyPlayer = this.renderEmptyPlayer(
      Math.sqrt(listSize) - cams.length,
    )
    return (
      <div
        className={classNames(classes.row, {
          [classes.rowHalf]: listSize === 4,
          [classes.rowOneThird]: listSize === 9,
          [classes.rowQuarter]: listSize === 16,
        })}
      >
        {cams.map((cam, index) => {
          return (
            <WrapperPlayer key={cam.cam_id}>
              {(cam.starting || cam.adding)? (
                <Loading />
              ) : (
                // <Player cam={{...cam, stream_url: `http://116.110.52.83:1085${cam.stream_url}`}} key={cam.cam_id} />
                <PlayerHls cam={cam} key={cam.id} muted={true}/>
              )}
            </WrapperPlayer>
          )
        })}
        {remainEmptyPlayer}
      </div>
    )
  }
}

const mapStateToProps = ({ followList }) => ({
  listSize: followList.listSize,
})

export default connect(mapStateToProps)(withStyles(styles)(RowCamera))
