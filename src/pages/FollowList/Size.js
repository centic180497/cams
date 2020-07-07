import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { changeListSize } from '../../../actions/action_followList'

const styles = theme => {
  return {
    root: {
      display: 'flex',
      borderRight: '2px solid #ccc',
      // flexDirection: 'column',
    },
    formControl: {
      marginTop: 8,
      marginLeft: 8 * 3,
    },
    group: {
      margin: '0',
      flexDirection: 'row',
    },
    radio: {
      padding: '0',
    },
  }
}

class Size extends Component {
  state = {
    value: '2x2',
  }

  handleChange = event => {
    this.props.changeListSize(event.target.value)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <RadioGroup
            aria-label="Gender"
            name="size"
            className={classes.group}
            value={this.props.list_size}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="4"
              control={<Radio color="primary" className={classes.radio} />}
              label="2 x 2"
            />
            <FormControlLabel
              value="9"
              control={<Radio color="primary" className={classes.radio} />}
              label="3 x 3"
            />
            <FormControlLabel
              value="16"
              control={<Radio color="primary" className={classes.radio} />}
              label="4 x 4"
            />
            <FormControlLabel
              value="25"
              control={<Radio color="primary" className={classes.radio} />}
              label="5 x 5"
            />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

Size.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = ({ followList }) => ({
  list_size: followList.list_size,
})

export default connect(
  mapStateToProps,
  {
    changeListSize: changeListSize,
  },
)(withStyles(styles)(Size))
