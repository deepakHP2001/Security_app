import { CHANGE_ROUTE_COMPONENT } from './actionTypes';

export const changeRouteComponent = function(payload) {
    return dispatch => {
        dispatch({
            type: CHANGE_ROUTE_COMPONENT,
            payload: payload
        });
    }
}