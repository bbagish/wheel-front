import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import auth from "../services/authService";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const reset = () => {
        setUsername('');
        setPassword('');
    }

    const doSubmit = async (e) => {
        e.preventDefault();
        try {
            await auth.login(username, password);
            console.log(auth.getCurrentUser());
            setUser(auth.getCurrentUser());
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                return toast.error(ex.response.data);
            }
            if (ex.response && ex.response.status === 401) {
                return toast.error(ex.response.data.msg);
            }
        }
        handleClose();
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            <ToastContainer autoClose={5000}
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>To sign in</DialogContentText>
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
export default Login;