import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import statuses from './statuses';
import auth from './auth';
import route from './route';

const RootReducer = combineReducers({
	auth,
	statuses,
	route,
	routing: routerReducer 
});

export default RootReducer;
