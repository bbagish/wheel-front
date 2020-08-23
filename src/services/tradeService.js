import http from "./httpService";

const apiEndpoint = "/trades";

function tradeURL(id) {
    return `${apiEndpoint}/${id}`;
}

export function getTrade(tradeID) {
    return http.get(tradeURL(tradeID));
}

export function getTrades() {
    return http.get(apiEndpoint);
}

// EDIT OR CREATE A NEW trade
export function saveTrade(trade) {
    // IF trade EXISTS EDIT
    if (trade._id) {
        const body = { ...trade };
        delete body._id;
        return http.put(tradeURL(trade._id), body);
    }
    return http.post(apiEndpoint, trade);
}

export function deleteTrade(tradeID) {
    return http.delete(tradeURL(tradeID));
}