import { Actions } from './redux.js';
import { Login } from './components/Login.jsx';
import './routes.jsx';

const Components = {Login};


/*
Meteor.methods({
  test() {
    Accounts.createUser({username: 'test', 'email': 'test@test.com', password: '123456'}, (err) => {
      debugger;
    });
  }
});
*/

export { Actions, Components };
