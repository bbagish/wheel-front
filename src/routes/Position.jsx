import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Navigation from '../components/Navigation';
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import EditPosition from "../components/EditPosition";
import DeletePosition from "../components/DeletePosition";
import { getPosition } from '../services/positionService';
const Position = (props) => {

  const [trades, setTrades] = useState([]);
  const [position, setPosition] = useState();

  useEffect(() => {
    console.log(props);
    (async () => {
      try {
        const positionID = props.match.params.id;
        const { data } = await getPosition(positionID);
        setPosition(data);
        setTrades(data.trades);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.push("/not-found");
      }
    })();
  }, [props]);

  return (
    <React.Fragment>
      <Navigation user={props.user}/>
      <Container fixed='true'>
        <Grid container spacing={3} style={{ marginTop: 15 }}>
          {position &&
            <Grid item xs={12}>
              <h1>{position.symbol}</h1>
              <p>Average Share Price: ${position.price}</p>
              <p>Number of Shares: {position.numOfShares}</p>
              <p>Adjusted Cost: ${position.price * position.numOfShares}</p>
              <div>
                <EditPosition {...props} position={position}></EditPosition>
              </div>
              <br></br>
              <div>
                <DeletePosition {...props}></DeletePosition>
              </div>
            </Grid>
          }
          <Grid item xs={2} sm={2}>
            <TradeForm {...props} trades={trades} setTrades={setTrades} />
          </Grid>
          <Grid item xs={10} sm={10}>
            <TradeList trades={trades} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Position;
