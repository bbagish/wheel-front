import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const Navigation = ({ user }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography style={{ flexGrow: 1 }}>
                        <Button href="/" color="inherit" variant="outlined">SMART TRADER</Button>
                    </Typography>
                    {!user && (
                        <div className={classes.root}>
                            <Button href="/login" color="inherit" variant="outlined">Login</Button>
                            <Button href="/register" color="inherit" variant="outlined">Register</Button>
                        </div>
                    )}
                    {user && (
                        <div className={classes.root}>
                            <Button color="inherit" variant="outlined">{user.username}</Button>
                            <Button component={Link} variant="outlined" to="/logout" color="inherit" >Logout</Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment >
    );
}

export default Navigation;