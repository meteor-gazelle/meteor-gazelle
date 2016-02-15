import { App } from './components/App.jsx';
import { Welcome } from './components/Welcome.jsx';

export default (() => {
  // Main route
  Router.public.route('/', {
    name: 'index',
    action: function (params, queryParams) {
      ReactLayout.render(App, {
        yield: <Welcome />
      });
    }
  });

  // /welcome route
  Router.public.route('/welcome', {
    name: 'welcome',
    action () {
      ReactLayout.render(App, {
        yield: <Welcome />
      });
    }
  });
})();
