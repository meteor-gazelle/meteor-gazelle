import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';

export default (() => {
  Router.public.route('/login', {
    name: 'login',
    action() {
      ReactLayout.render(App, {
        yield: <Login />
      });
    }
  });

  Router.public.route('/register', {
    name: 'register',
    action() {
      ReactLayout.render(App, {
        yield: <Register />
      });
    }
  });

})();
