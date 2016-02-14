import * as Redux from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

Redux._reducers = {};
Redux.store = null;

const logger = createLogger();

Redux.registerReducer = (reducer) => {
  reducer = typeof yourVariable === 'object' ? reducer : { reducer };
  Redux._reducers = _.extend(Redux._reducers, reducer);
  const appReducer = Redux.combineReducers(Redux._reducers);
  if (Redux.store) {
    Redux.store.replaceReducer(appReducer);
  } else {
    //TODO Look into logger options
    Redux.store = Redux.createStore(appReducer, Redux.applyMiddleware(thunk, logger));
  }
};

export { Redux };


