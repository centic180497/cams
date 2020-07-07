import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
    root: {
        display: 'flex',
        borderRight: '2px solid #ccc'
    },
    group: {
        flexDirection: 'row',
    },
    formControl: {
        margin: '0',
        marginTop: 8,
    },
    radio: {
        padding: '0'
    }

})


class Pagination extends Component{

    renderPaginationIndex = () => {
        const { total_page } = this.props
        const index = []
        for (let i=0; i< total_page; i++){
            index.push(i+1)
        }
        return index
    }
    render(){
        const index = this.renderPaginationIndex()
        const { classes } = this.props
        return(
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <RadioGroup
                        aria-label="Gender"
                        name="size"
                        className={classes.group}
                        value={this.props.current_page}
                        // onChange={this.handleChange}
                    >
                        {(index.length > 1) && index.map((x, i) => (
                            <FormControlLabel 
                                value={x}
                                key={i}
                                control={<Radio color="primary" className={classes.radio}/>} />
                        ))}
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }
}

const mapStateToProps = ({followList}) => ({
    current_page: followList.current_page,
    total_page: followList.total_page,
})

export default connect(mapStateToProps)(withStyles(styles)(Pagination))