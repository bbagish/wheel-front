import { useState } from "react";
import moment from "moment";

export default () => {
  const getToday = () => {
    const date = new Date();
    return formatDate(date);
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD");
  };

  const [trade, setTrade] = useState({
    symbol: 'NKLA',
    type: 'Call',
    strikePrice: '',
    expiration: getToday(),
    premium: '',
    date: getToday(),
    status: ''
  });

  return {
    trade,
    onChange: (event) => {
      setTrade({
        ...trade,
        [event.target.name]: event.target.value
      });
    },

    reset: () =>
      setTrade({
        symbol: 'NKLA',
        type: 'Call',
        strikePrice: '',
        expiration: getToday(),
        premium: '',
        date: getToday(),
        status: ''
      })
  };
};
