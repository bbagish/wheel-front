import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import moment from "moment";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

// const getToday = () => {
//   const date = new Date();
//   return formatDate(date);
// };

// const limitDate = (limit) => {
//   if (limit) {
//     return getToday();
//   } else {
//     return '';
//   }
// };

// const formatDate = (date) => {
//   return moment(date).format("YYYY-MM-DD");
// };

const DatePicker = (props) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      style={{ marginLeft: 20, marginTop: 20, display: "block" }}
      id={props.id}
      label={props.name}
      type="date"
      value={props.selectedDate}
      onChange={(val) => {
        props.handleDateChange(val);
      }}
      className={classes.textField}
      // InputProps={{ inputProps: { max: limitDate(props.limitFutureDates) } }}
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

export default DatePicker;
