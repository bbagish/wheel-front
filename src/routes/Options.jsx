import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import useTradeState from "../state/useTradeState";

const Options = () => {

  const [options, setOptions] = useState();
  const [position, setPosition] = useState();
  const { trades, addTrade, deleteTrade } = useTradeState([]);

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/positions/${id}`)
      .then(res => res.json())
      .then(res => {
        setPosition(res);
        setOptions(res.trades);
      })
  }, [id]);

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>Smart Trader</Toolbar>
      </AppBar>
      <Toolbar />
      <Container fixed='true'>
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          {position &&
            <Grid item xs={12}>
              <h1>{position.symbol}</h1>
              <p>Average Share Price: ${position.price}</p>
              <p>Number of Shares: {position.numOfShares}</p>
              <p>Adjusted Cost: ${position.price * position.numOfShares}</p>
            </Grid>
          }
          <Grid item xs={2} sm={2}>
            <TradeForm saveTrade={(trade) => addTrade(trade)} />
          </Grid>
          <Grid item xs={10} sm={10}>
            <TradeList trades={options} deleteTrade={deleteTrade} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Options;
