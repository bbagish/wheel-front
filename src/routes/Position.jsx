import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Navigation from '../components/Navigation';
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import EditPosition from "../components/EditPosition";
import DeletePosition from "../components/DeletePosition";
import { getPosition } from '../services/positionService';
import { ToastContainer } from "react-toastify";
const Position = (props) => {

  const [position, setPosition] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const positionID = props.match.params.id;
        const { data } = await getPosition(positionID);
        setPosition(data);
      } catch (ex) {
        if (ex.response && ex.response.status === 404)
          props.history.push("/not-found");
      }
    })();
  }, [props]);

  return (
    <React.Fragment>
      <Navigation user={props.user} />
      <Container fixed='true'>
      <ToastContainer autoClose={2000} />
        {position &&
          <Grid container spacing={3} style={{ marginTop: 15 }}>
            <Grid item xs={12}>
              <h1>{position.symbol}</h1>
              <p>Average Share Price: ${position.price.toFixed(2)}</p>
              <p>Number of Shares: {position.numOfShares}</p>
              <p>Cost Basis: ${position.costBasis.toFixed(2)}</p>
              <p>Adjusted Cost: ${position.adjustedCost.toFixed(2)}</p>
              <div>
                <EditPosition {...props} position={position}></EditPosition>
              </div>
              <br></br>
              <div>
                <DeletePosition {...props}></DeletePosition>
              </div>
            </Grid>
            <Grid item xs={2} sm={2}>
              <TradeForm {...props} setPosition={setPosition} />
            </Grid>
            <Grid item xs={10} sm={10}>
              <TradeList {...props} position={position} setPosition={setPosition} />
            </Grid>
          </Grid>
        }

      </Container>
    </React.Fragment>
  );
}

export default Position;
