import { createStore, applyMiddleware, compose } from 'redux';

import reducer from './reducers'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(),
  // other store enhancers if any
));

export default store