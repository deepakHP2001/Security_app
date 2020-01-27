import { CHANGE_ROUTE_COMPONENT } from '../actions/actionTypes';
import { ROUTE_COMPONENT } from './../operations/constants';

const intialState = {
    componentName: ROUTE_COMPONENT.ROUTE_ASSETS
}

function route (state=intialState, action) {
    const { type, payload } = action;
    switch(type) {
        case CHANGE_ROUTE_COMPONENT:
            state = {...state,componentName: payload }
            return state;
        default:
            return state;
    }
}

export default route;
