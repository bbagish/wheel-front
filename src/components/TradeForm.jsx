import React, { useState } from "react";
import moment from "moment";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import useInputState from "../state/useInputState";
import DatePicker from "./DatePicker";

const TradeForm = ({ saveTrade }) => {

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const getToday = () => {
    const date = new Date();
    return formatDate(date);
  };

  const { trade, reset, onChange } = useInputState();
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [expirationDate, setExpirationDate] = useState(getToday());

  const handleDateChange = (e) => {
    trade.date = formatDate(e.target.value);
    setSelectedDate(e.target.value);
  };

  const handleExpirationChange = (e) => {
    trade.expiration = formatDate(e.target.value);
    setExpirationDate(e.target.value);
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  }));

  const classes = useStyles();
  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        saveTrade(trade);
        reset();
      }}
    >
      <DatePicker
        id="filledDate"
        name="Filled Date"
        limitFutureDates={true}
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <DatePicker
        id="expiration"
        name="Expiration Date"
        limitFutureDates={false}
        selectedDate={expirationDate}
        handleDateChange={handleExpirationChange}
      />
      <TextField
        style={{ marginLeft: 20, marginTop: 20, display: "block" }}
        id="strikePrice"
        pattern="^\d+(?:\.\d{1,2})?$"
        type="number"
        label="Strike Price"
        variant="outlined"
        name="strikePrice"
        value={trade.strikePrice}
        onChange={onChange}
        required
      />
      <TextField
        style={{ marginLeft: 20, marginTop: 20, display: "block" }}
        id="premium"
        pattern="^\d+(?:\.\d{1,2})?$"
        type="number"
        label="Premium"
        variant="outlined"
        name="premium"
        value={trade.premium}
        onChange={onChange}
        required
      />
      <FormControl
        variant="outlined"
        className={classes.formControl}
        style={{
          marginLeft: 20,
          marginTop: 20,
          minWidth: 195,
          minHeight: "55px"
        }}
      >
        <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
        <Select
          native
          value={trade.type}
          onChange={onChange}
          label="Type"
          inputProps={{
            name: "type",
            id: "outlined-age-native-simple"
          }}
        >
          {/* <option aria-label="None" value="" /> */}
          <option value="Call">Call</option>
          <option value="Put">Put</option>
        </Select>
      </FormControl>
      <Button
        size="large"
        type="submit"
        style={{
          marginLeft: 20,
          marginTop: 10,
          minWidth: 195,
          minHeight: "55px",
          display: "block"
        }}
        variant="outlined"
        color="primary"
      >
        Add Trade
      </Button>
    </form>
  );
};

export default TradeForm;
