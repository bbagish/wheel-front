import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TradingViewWidget from 'react-tradingview-widget';
const useStyles = makeStyles({
    // backgroundColor: 'black',
    //color: theme.palette.primary.contrastText,
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        color: 'white',
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

export default function PositionCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h1" component="h1">JETS</Typography>
                <Typography variant="body1" component="p">Average Price: $17.23</Typography>
                <Typography variant="body1" component="p">Number of Shares: 120</Typography>
                <Typography variant="body1" component="p">Adjusted Cost: 120</Typography>
                <TradingViewWidget symbol="JETS" />
            </CardContent>
            <CardActions>
                <Button size="small">View Position</Button>
            </CardActions>

        </Card>
    );
}