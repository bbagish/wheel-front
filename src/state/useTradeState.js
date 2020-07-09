import { useState } from 'react';

export default initialValue => {
    const [trades, setTrades] = useState(initialValue);

    const calculateTotal = (trade) => {
        return {
            ...trade,
            totalCost: trade.purchasePrice * trade.numShares
        }
    }

    return {
        trades,
        addTrade: trade => {
            setTrades([...trades, calculateTotal(trade)]);
        },
        deleteTrade: tradeIndex => {
            const newTrades = trades.filter((_, index) => index !== tradeIndex);
            setTrades(newTrades);
        }
    };
};
