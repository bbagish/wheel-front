import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, symbol, purchasePrice, numShares, totalCost) {
  return { id, date, symbol, purchasePrice, numShares, totalCost };
}

const rows = [
  createData(0, '07 July, 2020', 'APA', '$13.20', 100, '$1320'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Trades({form}) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Trades</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Purchase Price</TableCell>
            <TableCell>Number Of Shares</TableCell>
            <TableCell align="right">Total Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.symbol}</TableCell>
              <TableCell>{row.purchasePrice}</TableCell>
              <TableCell>{row.numShares}</TableCell>
              <TableCell align="right">{row.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more trades
        </Link>
      </div>
    </React.Fragment>
  );
}
