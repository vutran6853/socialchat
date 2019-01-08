import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import userReducer  from './reducer';
import promiseMiddleware from 'redux-promise-middleware';

//// Use for Mult Reducers
const combinedReducers  = combineReducers({
  userReducer: userReducer
})

////  Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

////  Create store and add middleware
const store = createStore(combinedReducers, middlewares)

export default store;