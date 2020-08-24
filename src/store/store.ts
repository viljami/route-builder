import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import locations from './locations';
import reduxThunk from 'redux-thunk';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        locations
    }),
    composeEnhancers(applyMiddleware(reduxThunk))
);
