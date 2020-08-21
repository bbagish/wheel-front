import React from "react";
import { useParams } from "react-router";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default function TradeList({ trades }) {
  const formatDate = (date) => {
    return moment(date).format("DD MMMM, YYYY");
  };

  const formatExpiry = (date) => {
    return moment(date).format("MM/DD");
  };
  let { id } = useParams();

  const refreshPage = () => {
    window.location.reload(false);
  }

  const handleDelete = (trade_id) => {
    fetch(`http://localhost:3000/api/positions/${id}/trades/${trade_id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    refreshPage();
  }

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
              <TableRow hover key={index}>
                <TableCell>{formatExpiry(trade.expirationDate)}</TableCell>
                <TableCell>${trade.strikePrice}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>${trade.premium}</TableCell>
                <TableCell>{formatDate(trade.filledDate)}</TableCell>
                <TableCell>{trade.status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => {
                      handleDelete(trade._id);
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
