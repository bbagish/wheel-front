import http from "./httpService";

const apiEndpoint = "/positions";

function positionURL(id) {
    return `${apiEndpoint}/${id}`;
}

export function getPosition(positionID) {
    return http.get(positionURL(positionID));
}

export function getPositions() {
    return http.get(apiEndpoint);
}

// EDIT OR CREATE A NEW POSITION
export function savePosition(position) {
    // IF POSITION EXISTS EDIT
    if (position._id) {
        const body = { ...position };
        delete body._id;
        return http.put(positionURL(position._id), body);
    }
    return http.post(apiEndpoint, position);
}

export function deletePosition(positionID) {
    return http.delete(positionURL(positionID));
}