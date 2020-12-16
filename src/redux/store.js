import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];
const rootReducer = combineReducers({
    ...reducers,
});

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares))
);

export { store };