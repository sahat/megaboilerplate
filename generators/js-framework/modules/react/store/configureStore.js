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
    //= REDUX_STORE_ENHANCER_INDENT2
  );
  //= WEBPACK_HOT_REDUCER_INDENT1

  return store;
}
