import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditPosition = ({ position }) => {

    const [open, setOpen] = useState(false);
    const [numOfShares, setShares] = useState(position.numOfShares);
    const [price, setPrice] = useState(position.price);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    const refreshPage = () => {
        window.location.reload(false);
    }

    const handleSubmit = () => {
        fetch(`http://localhost:3000/api/positions/${position._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                symbol: position.symbol,
                price: price,
                numOfShares: numOfShares
            })
        })
        handleClose();
        refreshPage();
    }


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Edit Position</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Position</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To enter a new trade we need symbol, average cost per share and number of shares
          </DialogContentText>

                    <TextField
                        id="symbol"
                        label="Symbol"
                        name="symbol"
                        margin="dense"
                        defaultValue={position.symbol}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                    <TextField
                        autoComplete="off"
                        autoFocus
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
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditPosition;