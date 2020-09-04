import http from "./httpService";

const apiEndpoint = "trades";

function tradeURL(positionID, tradeID) {
    return `/positions/${positionID}/${apiEndpoint}/${tradeID}`;
}

export function getTrade(positionID, tradeID) {
    return http.get(tradeURL(positionID, tradeID));
}

export function getTrades(positionID) {
    return http.get(`/positions/${positionID}/${apiEndpoint}`);
}

// EDIT OR CREATE A NEW trade
export function saveTrade(positionID, trade) {
    // IF trade EXISTS EDIT
    // if (trade._id) {
    //     const body = { ...trade };
    //     delete body._id;
    //     return http.put(tradeURL(positionID, trade._id), body);
    // }
    return http.post(`/positions/${positionID}/${apiEndpoint}`, trade);
}

export function deleteTrade(positionID, tradeID) {
    return http.delete(tradeURL(positionID, tradeID));
}