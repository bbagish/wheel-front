import { useState } from "react";

export default (initialValue) => {
  const [trades, setTrades] = useState(initialValue);

  return {
    trades,
    addTrade: (trade) => {
      setTrades([...trades, trade]);
    },
    deleteTrade: (tradeIndex) => {
      const newTrades = trades.filter((_, index) => index !== tradeIndex);
      setTrades(newTrades);
    }
  };
};
