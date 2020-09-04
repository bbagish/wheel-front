import http from "./httpService";
import { getJwt } from "./authService";
const apiEndpoint = "/positions";

function positionURL(id) {
    return `${apiEndpoint}/${id}`;
}

export function getPosition(positionID) {
    return http.get(positionURL(positionID),
        { headers: { "x-auth-token": getJwt() }});
}

export function getPositions() {
    return http.get(apiEndpoint,
        { headers: { "x-auth-token": getJwt() }});
}

// EDIT OR CREATE A NEW POSITION
export function savePosition(position) {
    // IF POSITION EXISTS EDIT
    if (position._id) {
        const body = { ...position };
        delete body._id;
        return http.put(positionURL(position._id), body, 
        { headers: { "x-auth-token": getJwt() }});
    }
    return http.post(apiEndpoint, position);
}

export function deletePosition(positionID) {
    return http.delete(positionURL(positionID,
        { headers: { "x-auth-token": getJwt() }}));
}