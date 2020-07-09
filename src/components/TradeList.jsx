import React from 'react';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

export default function TradeList({ trades, deleteTodo }) {

  const formatDate = date => {
    return moment(date).format('DD MMMM, YYYY');
  }

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
          {trades && trades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(trade.date)}</TableCell>
              <TableCell>{trade.symbol}</TableCell>
              <TableCell>${trade.purchasePrice}</TableCell>
              <TableCell>{trade.numShares}</TableCell>
              <TableCell align="right">${trade.totalCost}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
