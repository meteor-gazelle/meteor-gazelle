import { Home } from './components/Home.jsx';
import './routes.jsx';
import * as reducers from './reducer.js'

Redux.registerReducer(reducers);

//Redux.store.dispatch({type: "SELECT_PLAYER", playerId: "123"});
//console.log(Redux.store.getState());

export { Home };
