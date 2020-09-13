import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { register } from '../services/userService';
import auth from "../services/authService";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Registration = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const reset = () => {
        setEmail('');
        setUsername('');
        setPassword('');
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            doSubmit(event);
        }
    }

    const doSubmit = async (e) => {
        // if (!username || !email || !password) {
        //     console.log("ENTER USER NAME");
        // }

        e.preventDefault();
        try {
            const response = await register({
                email: email,
                username: username,
                password: password
            });

            console.log("response", response);
            console.log("token", response.headers["x-auth-token"])
            auth.loginWithJwt(response.headers["x-auth-token"]);

            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                if (ex.response.data.msg) {
                    return toast.error(ex.response.data.msg);
                }
                return toast.error(ex.response.data);
            }
        }
        handleClose();
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Sign Up</Button>
            <Dialog open={open} onClose={handleClose} onKeyDown={handleKeyDown} aria-labelledby="form-dialog-title">
                <ToastContainer autoClose={5000}
                    position="top-right"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    pauseOnHover
                />

                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>To sign up fill out this form</DialogContentText>
                    <TextField
                        autoComplete="off"
                        autoFocus
                        id="email"
                        label="Email"
                        name="email"
                        margin="dense"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        autoComplete="off"
                        id="username"
                        label="Username"
                        name="username"
                        margin="dense"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        autoComplete="off"
                        id="password"
                        label="Password"
                        name="password"
                        margin="dense"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={doSubmit} type="submit" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default Registration;