import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Login from '../routes/Login'
import Typography from '@material-ui/core/Typography';
import Registration from '../routes/Registration';
import Button from '@material-ui/core/Button';
const Navigation = ({ user, setUser }) => {
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography style={{ flexGrow: 1 }}>
                        <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>SMART TRADER</Link>
                    </Typography>
                    {!user && (
                        <React.Fragment>
                            <Login setUser={setUser}/>
                            <Registration />
                        </React.Fragment>
                    )}
                    {user && (
                        <React.Fragment>
                            <Button color="inherit">{user.username}</Button>
                            <Button component={ Link } to="/logout" color="inherit" >Logout</Button>
                        </React.Fragment>
                    )}
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment >
    );
}

export default Navigation;