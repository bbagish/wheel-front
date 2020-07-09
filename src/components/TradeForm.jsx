import React from 'react';
import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import useInputState from '../state/useInputState'
import DatePicker from './DatePicker';

const TradeForm = ({ saveTrade }) => {
    const { trade, reset, onChange } = useInputState();

    const getToday = () => {
        const date = new Date();
        return formatDate(date);
    }

    const formatDate = (date) => {
        return moment(date).format('YYYY-MM-DD');
    }

    const [selectedDate, setSelectedDate] = React.useState(getToday());
    
    const handleDateChange = e => {
        trade.date = formatDate(e.target.value);
        setSelectedDate(e.target.value);
    };
    
    return (
        <form autoComplete="off" onSubmit={e => {
            e.preventDefault(); saveTrade(trade); reset();
        }}
        >
            <TextField style={{ marginLeft: 10, marginTop: 10 }} id="symbol" type='text' label="Symbol" variant="outlined" name='symbol' value={trade.symbol} onChange={ onChange } inputProps={{ maxLength: 5 }} required />
            <DatePicker selectedDate = { selectedDate } handleDateChange = { handleDateChange }/>
            <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id='purchasePrice' pattern="^\d+(?:\.\d{1,2})?$" type='number' label="Purchase Price" variant="outlined" name='purchasePrice' value={trade.purchasePrice} onChange={onChange} required />
            <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id='numShares' type='number' label="Number Of Shares" variant="outlined" name='numShares' value={trade.numShares} onChange={onChange} required />
            <TextField style={{ marginLeft: 10, marginTop: 10, display: 'block' }} id="totalCost" label="Total Cost" variant="outlined" value={trade.purchasePrice * trade.numShares}
                InputProps={{
                    readOnly: true,
                }} />
            <Button size="large" type='submit' style={{ marginLeft: 10, marginTop: 10, minWidth: 195, minHeight: '55px' }} variant="outlined" color="primary">Add Trade</Button>
        </form>
    );
};

export default TradeForm;