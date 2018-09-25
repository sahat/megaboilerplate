import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, logger),
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
  );

  return store;
}
