import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middlewares = [thunk];
const rootReducer = combineReducers({
    ...reducers,
});
let enhancers = [];
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window._REDUX_DEVTOOLS_EXTENSION_

    if (typeof devToolsExtension === 'function') {

        enhancers.push(devToolsExtension({ trace: true }))
    }
}

const store = createStore(
    rootReducer,
    compose(compose(applyMiddleware(...middlewares), ...enhancers))
);

export { store };