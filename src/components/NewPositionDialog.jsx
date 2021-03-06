import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const NewPositionDialog = () => {

    const [numOfShares, setShares] = useState(null);
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [symbol, setSymbol] = useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        fetch(`http://localhost:3000/api/positions`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                symbol: symbol,
                price: price,
                numOfShares: numOfShares
            })
        });
        handleClose();
        refreshPage();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add New Position</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Position</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To enter a new trade we need symbol, average cost per share and number of shares
          </DialogContentText>

                    <TextField
                        autoComplete="off"
                        autoFocus
                        id="symbol"
                        label="Symbol"
                        name="symbol"
                        margin="dense"
                        onChange={e => setSymbol(e.target.value)}
                        value={symbol}
                        fullWidth
                        required
                    />
                    <TextField
                        autoComplete="off"
                        id="price"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        type="number"
                        label="Average Cost Per Share"
                        name="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        margin="dense"
                        fullWidth
                        required
                    />
                    <TextField
                        autoComplete="off"
                        id="numOfShares"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        type="number"
                        label="Number of Shares"
                        name="numOfShares"
                        value={numOfShares}
                        onChange={e => setShares(e.target.value)}
                        margin="dense"
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} type="submit" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewPositionDialog;