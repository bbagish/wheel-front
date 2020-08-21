import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const Navigation = () => {

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar><Link to={'/'} style={{color: 'inherit', textDecoration: 'none'}}>Smart Trader</Link></Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}

export default Navigation;