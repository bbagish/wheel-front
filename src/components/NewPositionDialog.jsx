import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getPositions, savePosition } from '../services/positionService';
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const NewPositionDialog = ({ setPositions }) => {

    const [numOfShares, setShares] = useState('');
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState('');
    const [symbol, setSymbol] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const reset = () => {
        setShares('');
        setPrice('');
        setSymbol('');
    }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    }
    const handleSubmit = async (e) => {
        const costBasis = (price * numOfShares).toFixed(2);
        console.log(e.keyCode);
        e.preventDefault();
        try {
            await savePosition({
                symbol: symbol,
                price: price,
                numOfShares: numOfShares,
                costBasis: costBasis,
                adjustedCost: costBasis
            });
            const { data: positions } = await getPositions();

            setPositions(positions);
            handleClose();
        } catch (ex) {
            if (ex.response && ex.response.status === 401) {
                return toast.error("You don't need to be logged in to do that.");
            }
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add New Position</Button>
            <ToastContainer autoClose={5000}
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" onKeyDown={handleKeyDown} >
                <DialogTitle id="form-dialog-title">Add New Position</DialogTitle>
                <DialogContent>
                    <DialogContentText>To enter a new trade we need symbol, average cost per share and number of shares</DialogContentText>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        id="symbol"
                        label="Symbol"
                        name="symbol"
                        margin="dense"
                        type="text"
                        inputProps={{ maxLength: 5, pattern: "[a-z]" }}
                        value={symbol}
                        onChange={e => setSymbol(e.target.value.toUpperCase())}
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
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewPositionDialog;