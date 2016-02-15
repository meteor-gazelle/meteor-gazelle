import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';

export default (() => {
  // Login route
  Router.public.route('/login', {
    name: 'login',
    action (params, queryParams) {
      ReactLayout.render(App, {
        yield: <Login />
      });
    }
  });

  // Registration route
  Router.public.route('/register', {
    name: 'register',
    action (params, queryParams) {
      ReactLayout.render(App, {
        yield: <Register />
      });
    }
  });

})();
