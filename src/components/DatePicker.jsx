import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200
    },
}));

const DatePicker = (props) => {

    const classes = useStyles();
    return (
        <TextField
            variant="outlined"
            style={{ marginLeft: 10, marginTop: 10, display: 'block' }}
            id="purchaseDate"
            label="Purchase Date"
            type="date"
            value={props.selectedDate}
            onChange={val => {
                props.handleDateChange(val);
            }}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

export default DatePicker;