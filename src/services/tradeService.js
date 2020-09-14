import http from "./httpService";

const apiEndpoint = "trades";

function tradeURL(positionID, tradeID) {
    return `/positions/${positionID}/${apiEndpoint}/${tradeID}`;
}

// EDIT OR CREATE A NEW trade
export function saveTrade(positionID, trade) {
    // IF trade EXISTS EDIT
    if (trade._id) {
        const body = { ...trade };
        delete body._id;
        return http.put(tradeURL(positionID, trade._id), body);
    }
    return http.post(`/positions/${positionID}/${apiEndpoint}`, trade);
}

export function closeTrade(positionID, trade) {
    const body = { ...trade };
    delete body._id;
    return http.put(`/positions/${positionID}/${apiEndpoint}/${trade._id}/close`, body);
}

export function deleteTrade(positionID, tradeID) {
    return http.delete(tradeURL(positionID, tradeID));
}