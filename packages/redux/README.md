# meteor-gazelle:redux

This package provides redux functionality to the app

### Modules

#### Client
* Redux
  * `registerReducer(reducer)` - Register a redux reducer
  * `store` - The app state
  * `createStore(reducer, intialState, enhancer)` - Create a redux store to hold the state tree
  * `combineReducers(reducers)` - Turns an object whose values are different reducer functions into a single reducer function
  * `bindActionCreators(actionCreators, dispatch)` - Turns an object whose values are action creators, into an object with the same keys but with every function wrapped into a `dispatch` call
  * `applyMiddleware(...middlewares)` - Apply middlewares to the dispatch method of the store
  * `compose(...funcs)` - Composes single-argument functions from right to left
  * `warning(message)` - Prints a warning to the console
