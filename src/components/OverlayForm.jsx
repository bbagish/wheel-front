
const OverlayForm = (buttonName, formName, message, handleSubmit, props) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>{buttonName}</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{formName}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{message}</DialogContentText>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} type="submit" color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

// OverlayForm.propTypes = {
//     children: PropTypes.element.isRequired
// };