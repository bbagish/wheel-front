import React from "react";
import { Grid } from '@material-ui/core';
import TradeForm from "./components/TradeForm";
import TradeList from './components/TradeList'
import useTradeState from './state/useTradeState';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function App() {
    const { trades, addTrade, deleteTrade } = useTradeState([]);

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>{'Smart Trader'}</Toolbar>
            </AppBar>
            <Toolbar />
            <TradeForm
                saveTrade={trade => addTrade(trade)}
            />
            <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <TradeList trades={trades} deleteTrade={deleteTrade} />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default App;