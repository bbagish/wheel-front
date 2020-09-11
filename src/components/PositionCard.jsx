import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { CardActionArea } from '@material-ui/core';
// import moment from 'moment';
const useStyles = makeStyles({

    root: {
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
                        <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <div>
                                <Typography variant="h3" component="h3">{position.symbol}</Typography>
                                <Typography variant="body2" component="p">Owner: {position.author.userName.toUpperCase()}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ fontWeight: "bold" }}>
                                <Typography variant="h6" component="h6">Cost Basis: ${position.costBasis}</Typography>
                                <Typography variant="body1" component="p">Adjusted Cost: ${position.adjustedCost}</Typography>
                            </div>
                        </Grid>
                        <Grid item xs style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div>
                                <Typography variant="h6" component="h6" style={{color: 'green'}}>+${position.costBasis - position.adjustedCost}</Typography>
                                <Typography variant="body1" component="p"style={{color: 'green'}}>+{(((position.costBasis - position.adjustedCost)/((position.costBasis + position.adjustedCost)/2))* 100).toFixed(2)}%</Typography>
                                {/* ((1700 - 1500) / ((1700 + 1500) / 2)) X 100 */}
                            </div>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default PositionCard;