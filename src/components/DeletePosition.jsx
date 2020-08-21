import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams } from "react-router";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from "react-router-dom";

const EditPosition = (props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const refreshPage = () => {
        window.location.reload(false);
    }

    let { id } = useParams();
    const history = useHistory();
    const handleDelete = () => {
        fetch(`http://localhost:3000/api/positions/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
        console.log("POSITION DELETE SUCCESSFULLY");
        handleClose();
        history.push('/');
        refreshPage();
      }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Delete Position</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Position</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this position?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditPosition;