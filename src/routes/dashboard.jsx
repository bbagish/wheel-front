import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { getPosition } from '../services/positionService';
import clsx from 'clsx';
import TradeList from "../components/TradeList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                {position &&
                  <React.Fragment>
                    <h1>{position.symbol}</h1>
                    <p>Average Share Price: ${position.price.toFixed(2)}</p>
                    <p>Number of Shares: {position.numOfShares}</p>
                    <p>Cost Basis: ${position.costBasis.toFixed(2)}</p>
                    <p>Adjusted Cost: ${position.adjustedCost.toFixed(2)}</p>
                  </React.Fragment>
                }
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <p>test</p>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <TradeList {...props} position={position} setPosition={setPosition} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
export default Dashboard;