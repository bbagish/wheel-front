import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Container from "@material-ui/core/Toolbar";
import Navigation from '../components/Navigation';
import { Grid } from "@material-ui/core";
import TradeForm from "../components/TradeForm";
import TradeList from "../components/TradeList";
import EditPosition from "../components/EditPosition";
import DeletePosition from "../components/DeletePosition";

const Options = (props) => {

  const [options, setOptions] = useState([]);
  const [position, setPosition] = useState();

  let { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/positions/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if(res.msg){
            props.history.push('/404')
        }

        setPosition(res);
        setOptions(res.trades);
      }).catch(function() {
        console.log("error");
    });
  }, [id, props.history]);

  return (

    <React.Fragment>
      <Navigation />
      <Container fixed='true'>
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          {position &&
            <Grid item xs={12}>
              <h1>{position.symbol}</h1>
              <p>Average Share Price: ${position.price}</p>
              <p>Number of Shares: {position.numOfShares}</p>
              <p>Adjusted Cost: ${position.price * position.numOfShares}</p>
              <div>
                <EditPosition props={props} position={position}></EditPosition>
              </div>
              <br></br>
              <div>
                <DeletePosition></DeletePosition>
              </div>

            </Grid>
          }
          <Grid item xs={2} sm={2}>
            <TradeForm />
          </Grid>
          <Grid item xs={10} sm={10}>
            <TradeList trades={options}/>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Options;
