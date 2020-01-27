import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers/RootReducer";
import thunk from 'redux-thunk';

/* Using thunk let's us return functions as actions
 * from action creators instead of JSON objects.
 * This enables us to delay dispatching actions.
 */

const createStoreWithMiddleware = applyMiddleware(
    thunk
)(createStore);

export default function configureStore(initialState) {
	// enabling dev loading debuggers 
    if (process.env.NODE_ENV === "development")
        return createStoreWithMiddleware(RootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    else
        return createStoreWithMiddleware(RootReducer, initialState);
}
