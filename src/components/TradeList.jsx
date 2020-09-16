import React from "react";
import { useParams } from "react-router";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseTrade from "./CloseTrade";
import { deleteTrade } from '../services/tradeService';
import EditTrade from "./EditTrade";

export default function TradeList({ user, position, setPosition }) {
  const formatDate = (date) => {
    return moment(date).format("DD MMMM, YYYY");
  };

  const formatExpiry = (date) => {
    return moment(date).format("MM/DD");
  };

  const { id } = useParams();

  const handleDelete = async (trade_id) => {
    const { data: updatePosition } = await deleteTrade(id, trade_id);
    setPosition(updatePosition);
  }

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>Recent Trades</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Expiration Date</TableCell>
            <TableCell>Strike Price</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Premium</TableCell>
            <TableCell>Filled Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Closing Price</TableCell>
            <TableCell>Profit/Loss</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {position.trades &&
            position.trades.map(trade => (
              <TableRow hover key={trade._id}>
                <TableCell>{formatExpiry(trade.expirationDate)}</TableCell>
                <TableCell>${trade.strikePrice}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell>${(trade.premium).toFixed(2)}</TableCell>
                <TableCell>{formatDate(trade.filledDate)}</TableCell>
                <TableCell>{trade.status}</TableCell>
                <TableCell>{trade.closingPrice != null ? `$${trade.closingPrice.toFixed(2)}` : null}</TableCell>
                <TableCell>{trade.profit != null ? `$${(trade.profit).toFixed(2)}` : null}</TableCell>
                <TableCell>
                  {(user && user._id === position.author.id) &&
                  <React.Fragment>
                      <EditTrade trade={trade}/>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          handleDelete(trade._id);
                        }}>
                        <DeleteIcon />
                      </IconButton>
                      <Buttons positionID={id} symbol={position.symbol} trade={trade} setPosition={setPosition} />
                    </React.Fragment>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

function Buttons({ positionID, symbol, trade, setPosition }) {
  if (trade.status === "CLOSED") {
    return null;
  }

  return (
    <CloseTrade positionID={positionID} symbol={symbol} trade={trade} setPosition={setPosition} />
  );
}