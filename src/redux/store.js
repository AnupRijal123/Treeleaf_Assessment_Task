import { createStore, applyMiddleware, compose } from 'redux';
import { urlReducer } from './reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(urlReducer, composeEnhancers(applyMiddleware()));
