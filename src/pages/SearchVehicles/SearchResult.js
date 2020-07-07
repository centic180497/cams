import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Scrollbars } from 'react-custom-scrollbars'
import _ from 'lodash'

import VehicleItem from './VehicleItem'
import Loading from '../../components/Loading'
import { searchVehicles } from '../../actions/action_searchVehicles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    // padding: '0 10px 0 10px'
  },
  wrapper: {
    padding: '0 10px 0 10px',
  },
  noResult: {
    fontSize: 16,
  },
})

class SearchResult extends Component {
  _onScroll = event => {
    const scrollbars = this.scrollbars
    const { currentPage, totalPage, isFetching, search } = this.props
    _.throttle(() => {
      if (
        Number(scrollbars.getScrollTop() + scrollbars.getClientHeight()) >=
        Number(scrollbars.getScrollHeight() - 200)
      ) {
        if (currentPage < totalPage && !isFetching) {
          this.props.searchVehicles({
            string: search.string,
            start_time: search.startTime,
            end_time: search.endTime,
            filter: search.filter,
            page: currentPage + 1,
          })
        }
      }
    }, 100)()
  }

  render() {
    // console.log('re render')
    const { classes, isFetching, vehicles = [] } = this.props
    return (
      <div className={classes.root}>
        <Scrollbars
          style={{ width: '100%', height: '100%' }}
          onScroll={this._onScroll}
          ref={el => {
            this.scrollbars = el
          }}
        >
          <div className={classes.wrapper}>
            {!isFetching && vehicles.length === 0 && (
              <div>
                <Typography className={classes.noResult} align="center" noWrap>
                  Không tìm thấy phương tiện
                </Typography>
              </div>
            )}
            {vehicles.map((vehicle, index) => {
              return <VehicleItem data={vehicle} key={index} />
            })}
            {isFetching && <Loading />}
          </div>
        </Scrollbars>
      </div>
    )
  }
}

const mapStateToProps = ({ searchVehicles }) => ({
  isFetching: searchVehicles.isFetching,
  vehicles: searchVehicles.vehicles,
  search: searchVehicles.search,
  currentPage: searchVehicles.currentPage,
  totalPage: searchVehicles.totalPage,
})

export default connect(
  mapStateToProps,
  {
    searchVehicles: searchVehicles,
  },
)(withStyles(styles)(SearchResult))
