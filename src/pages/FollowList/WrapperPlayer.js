import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
const styles = theme => ({
  root: {
    padding: 0,
    border: '1px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7ccc8'
  },
  half: {
    width: '50%',
  },
  oneThird: {
    width: '33.333333%',
  },
  quarter: {
    width: '25%',
  }
})
class WrapperPlayer extends Component {
  constructor(props) {
    super(props)
  }
  saveRef = elm => (this.wrapper = elm)

  render() {
    
    const { classes, listSize } = this.props
    return (
      <div
        className={classnames(classes.root, {
          [classes.half]: listSize === 4,
          [classes.oneThird]: listSize === 9,
          [classes.quarter]: listSize === 16,
          'column-20': listSize === 25,
        })}
        ref={this.saveRef}
      >
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = ({ followList }) => ({
  listSize: followList.listSize,
})

export default connect(mapStateToProps)(withStyles(styles)(WrapperPlayer))
