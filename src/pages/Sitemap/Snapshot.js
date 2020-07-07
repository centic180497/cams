import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PlayArrow from '@material-ui/icons/PlayArrow'
import TooltipWrapper from '../../components/TooltipWrapper'
import Loading from '../../components/Loading'
import { fetchCamSnapShot, fetchCamStreamingUrl } from '../../actions/action_camera'
import { getStreamingUrl } from '../../actions/action_streaming'
const styles = theme => ({
  root: {
    transformStyle: 'preserve-3d',
  },
  
  snapshot: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    transformStyle: 'preserve-3d',
    backgroundColor: theme.palette.common.black,
  },
  snapshotImg: {
    height: 270
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px 20px 20px'
  }, 
  playIcon: {
    color: 'rgba(255, 0, 0, 0.6);'
  }
})

class Snapshot extends Component{
  componentDidMount(){
    // this.props.getCamSnapshot(this.props.id)
    this.props.fetchCamSnapShot(this.props.id)
  }
  _onLiveStreamClick = () => {
    this.props.fetchCamStreamingUrl(this.props.id)
  }

  render(){
    const { 
      classes,
      isFetchingSnapshot,
      snapshotImageUrl
    } = this.props 
    return (
      <div className={classes.root}
        onClick={e => e.stopPropagation()}
      >
        {isFetchingSnapshot ? <Loading /> :
          <div className={classes.snapshot}>
            <img src={snapshotImageUrl} className={classes.snapshotImg}/>
            <div className={classes.controls}>
              <TooltipWrapper title="Live Stream">
                <IconButton className="ripple" onClick={this._onLiveStreamClick}>
                  <PlayArrow className={classes.playIcon}/>
                </IconButton>
              </TooltipWrapper>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({cameras}) => ({
  isFetchingSnapshot: cameras.isFetchingSnapshot,
  snapshotImageUrl: cameras.snapshotImageUrl,
})

export default connect(mapStateToProps, 
  {
    fetchCamSnapShot,
    fetchCamStreamingUrl,
    getStreamingUrl: getStreamingUrl,
  }
)(withStyles(styles)(Snapshot))