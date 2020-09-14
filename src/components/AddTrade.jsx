import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from "./DatePicker";
import { saveTrade } from '../services/tradeService';
import { getPosition } from "../services/positionService";
import { useParams } from "react-router";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import moment from "moment";

import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const AddTrade = ({ setPosition }) => {

    const formatDate = (date) => {
        return moment(date).format("YYYY-MM-DD");
    };

    const getToday = () => {
        const date = new Date();
        return formatDate(date);
    };

    const [open, setOpen] = useState(false);
    const [filledDate, setFilledDate] = useState(getToday());
    const [expirationDate, setExpirationDate] = useState(getToday());
    const [strikePrice, setStrikePrice] = useState('');
    const [premium, setPremium] = useState('');
    const [type, setType] = useState('Call');
    const { id: positionID } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const reset = () => {
        setFilledDate(getToday());
        setExpirationDate(getToday());
        setStrikePrice('');
        setPremium('');
        setType('Call');
    }
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!expirationDate || !strikePrice || !premium){
            return toast.error("All fields must be filled out.");
        }

        try {
            await saveTrade(positionID, {
                type: type,
                strikePrice: strikePrice,
                expirationDate: expirationDate,
                premium: premium,
                filledDate: filledDate,
                status: "OPEN"
            });
            const { data } = await getPosition(positionID);

            setPosition(data);
            handleClose();
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                return toast.error("You need to be logged in to do that.");
            }
        }
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add New Trade</Button>
            <ToastContainer autoClose={5000}
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDown} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Trade</DialogTitle>
                <DialogContent>
                    <DialogContentText>To enter a new trade we need symbol, average cost per share and number of shares</DialogContentText>
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
                        id="strikePrice"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        type="number"
                        label="Strike Price"
                        name="strikePrice"
                        value={strikePrice}
                        onChange={e => setStrikePrice(e.target.value)}
                        required
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                       
                        id="premium"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        type="number"
                        label="Premium"
                        name="premium"
                        value={premium}
                        onChange={e => setPremium(e.target.value)}
                        required
                        fullWidth
                        margin="dense"
                    />
                    <FormControl

                        fullWidth
                        margin="dense"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTrade;