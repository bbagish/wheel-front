import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { CardActionArea } from '@material-ui/core';
import moment from 'moment';
const useStyles = makeStyles({

    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'black'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const PositionCard = ({ position }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} key={position._id}>
            <CardActionArea component={RouterLink} to={`/positions/${position._id}`}>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h2" component="h2">{position.symbol}</Typography>
                        </Grid>
                        <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Average Price:</span> ${position.price}</Typography>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Number of Shares:</span> {position.numOfShares}</Typography>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Adjusted Cost:</span> ${position.numOfShares * position.price}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontWeight: "bold" }}>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Open Date: </span>{moment(position.createdAt).format('LLL')}</Typography>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Opening Note: </span>-</Typography>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>Closing Note: </span>-</Typography>
                                <Typography variant="body1" component="p"><span style={{ backgroundColor: 'black', borderRadius: '.15rem', color: 'white' }}>USER: </span>{position.author.userName}</Typography>
                            </div>
                        </Grid>
                    </Grid>

                    {/* <TradingViewWidget symbol="JETS" /> */}
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small">View Position</Button>
            </CardActions> */}

        </Card>
    );
}
export default PositionCard;