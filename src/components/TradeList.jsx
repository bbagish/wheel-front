import React from "react";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TradeList({ trades, deleteTrade }) {
  const formatDate = (date) => {
    return moment(date).format("DD MMMM, YYYY");
  };

  const formatExpiry = (date) => {
    return moment(date).format("MM/DD");
  };
  return (
    <React.Fragment>
      {/* $NKLA 07/20 $35 Call Premium */}
      <Title>Recent Trades</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Expiration Date</TableCell>
            <TableCell>Strike Price</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Filled Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades &&
            trades.map((trade, index) => (
              <TableRow key={index}>
                <TableCell>{formatExpiry(trade.expiration)}</TableCell>
                <TableCell>${trade.strikePrice}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>${trade.premium}</TableCell>
                <TableCell>{formatDate(trade.date)}</TableCell>
                <TableCell>{trade.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => {
                      deleteTrade(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
