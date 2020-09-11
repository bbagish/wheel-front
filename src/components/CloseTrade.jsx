import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeTrade } from '../services/tradeService';

const CloseTrade = ({ positionID, symbol, trade, setPosition }) => {

    const [closingPrice, setClosingPrice] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const reset = () => {
        setClosingPrice('');
    }

    //TODO: UPDATE AFTER CLOSING
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data: updatedPosition } = await closeTrade(positionID, {
            _id: trade._id,
            type: trade.type,
            strikePrice: trade.strikePrice,
            expirationDate: trade.expirationDate,
            premium: trade.premium,
            filledDate: trade.filledDate,
            closingPrice: closingPrice,
            status: "CLOSED"
        });

        setPosition(updatedPosition);
        handleClose();
    }

    return (
        <React.Fragment>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Close</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Close Trade</DialogTitle>
                <DialogContent>
                    <DialogContentText>Closing {symbol} ${trade.strikePrice} {trade.type} EXPIRING {trade.expirationDate}</DialogContentText>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        id="closingPrice"
                        label="Closing Price"
                        name="closingPrice"
                        margin="dense"
                        type="text"
                        inputProps={{ maxLength: 5, pattern: "[a-z]" }}
                        value={closingPrice}
                        onChange={e => setClosingPrice(e.target.value)}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default CloseTrade;