import { useState } from 'react';

export default () => {

    const [trade, setTrade] = useState({
        symbol: '',
        date: '',
        purchasePrice: '',
        numShares: '',
        totalCost: 0
    });

    return {
        trade,
        onChange: event => {
            setTrade({
                ...trade,
                [event.target.name]: event.target.value
            });
        },

        reset: () => setTrade({
            symbol: '',
            date: '',
            purchasePrice: '',
            numShares: '',
            totalCost: 0
        })
    };
};
