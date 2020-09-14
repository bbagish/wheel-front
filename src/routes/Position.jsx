import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Toolbar";
import { Grid } from "@material-ui/core";
import Navigation from '../components/Navigation';
import TradeList from "../components/TradeList";
import EditPosition from "../components/EditPosition";
import DeletePosition from "../components/DeletePosition";
import { getPosition } from '../services/positionService';
import { ToastContainer } from "react-toastify";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddTrade from "../components/AddTrade";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(8),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Position = (props) => {
  const classes = useStyles();
  const [position, setPosition] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const positionID = props.match.params.id;
        const { data } = await getPosition(positionID);
        console.log(data);
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
              {(props.user && props.user._id === position.author.id) &&
                <React.Fragment>
                  <div>
                    <EditPosition {...props} position={position}></EditPosition>
                  </div>
                  <br></br>
                  <div>
                    <DeletePosition {...props}></DeletePosition>
                  </div>
                </React.Fragment>
              }
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TradeList {...props} position={position} setPosition={setPosition} />
                {(props.user && props.user._id === position.author.id) &&
                  <AddTrade {...props} setPosition={setPosition} />
                }
              </Paper>
            </Grid>
          </Grid>
        }

      </Container>
    </React.Fragment>
  );
}

export default Position;
