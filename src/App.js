import React from 'react';
import './App.css';
import { Button, Grid, TextField } from '@material-ui/core';
import Trades from './components/Trades';
import moment from 'moment'
import Title from './components/Title';

function App() {
  const date = new Date();
  const today = moment(date).format('DD MMMM, YYYY');
  const [form, setValues] = React.useState({
    symbol: '',
    date: today,
    purchasePrice: 0,
    numShares: 0,
    totalCost: 0
  });
  
  const printValues = e => {
    e.preventDefault();
    const date = new Date();
    var d = moment(date).format('DD MMMM, YYYY');
    console.log(d);
    console.log(form.symbol, form.purchasePrice);
  };

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ marginTop: 200 }}>
      <Title>Share Purchase</Title>
      <form noValidate autoComplete="off" onSubmit={printValues}>
        <TextField style={{ marginLeft: 10, marginTop: 10 }} id="outlined-basic" label="Symbol" variant="outlined" name='symbol' value={form.symbol} onChange={updateField}/>
        <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id="outlined-basic" label="Purchase Date" variant="outlined" name='date' value={form.date} onChange={updateField} />
        <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id="outlined-basic" label="Purchase Price" variant="outlined" name='purchasePrice' value={form.purchasePrice} onChange={updateField} />
        <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id="outlined-basic" label="Number Of Shares" variant="outlined" name='numShares' value={form.numShares} onChange={updateField} />
        <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id="outlined-basic" label="Total Cost" variant="outlined" value={form.purchasePrice * form.numShares}
          InputProps={{
            readOnly: true,
          }} />
        <Button size="large" type='submit' style={{ marginLeft: 10, marginTop: 10, minWidth: 195, minHeight: '55px' }} variant="outlined" color="primary">Add Trade</Button>
      </form>
      <Grid container spacing={3}>
      <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <Trades form={form}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
