import React, { useState } from "react";
import moment from "moment";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DatePicker from "./DatePicker";
import { getTrades, saveTrade } from '../services/tradeService';

const TradeForm = (props) => {

  const {setTrades, trades} = props;
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const getToday = () => {
    const date = new Date();
    return formatDate(date);
  };


  const [filledDate, setFilledDate] = useState(getToday());
  const [expirationDate, setExpirationDate] = useState(getToday());
  const [strikePrice, setStrikePrice] = useState('');
  const [premium, setPremium] = useState('');
  const [type, setType] = useState('Call');
  const [status, setStatus] = useState('OPEN');

  const positionID = props.match.params.id;

  const handleSubmit = async (e) => {
    console.log("SUBMITTING");
    e.preventDefault()
    await saveTrade(positionID, {
      type: type,
      strikePrice: strikePrice,
      expirationDate: expirationDate,
      premium: premium,
      filledDate: filledDate,
      status: status
    });
    console.log("SAVED");
    const { data } = await getTrades(positionID);

    console.log("UPDATED STATE");
    setTrades(data);
  }
  
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
      onSubmit={handleSubmit}
    >
      <DatePicker
        id="filledDate"
        name="Filled Date"
        limitFutureDates={true}
        selectedDate={filledDate}
        handleDateChange={e => setFilledDate(e.target.value)}
      />
      <DatePicker
        id="expiration"
        name="Expiration Date"
        limitFutureDates={false}
        selectedDate={expirationDate}
        handleDateChange={e => setExpirationDate(e.target.value)}
      />
      <TextField
        style={{ marginLeft: 20, marginTop: 20, display: "block" }}
        id="strikePrice"
        pattern="^\d+(?:\.\d{1,2})?$"
        type="number"
        label="Strike Price"
        variant="outlined"
        name="strikePrice"
        value={strikePrice}
        onChange={e => setStrikePrice(e.target.value)}
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
        value={premium}
        onChange={e => setPremium(e.target.value)}
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
          value={type}
          onChange={e => setType(e.target.value)}
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
