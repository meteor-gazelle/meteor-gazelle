import { App } from './components/App.jsx';
import { Welcome } from './components/Welcome.jsx';

export default (() => {
  Router.public.route('/', {
    name: 'index',
    action: function (params, queryParams) {
      ReactLayout.render(App, {
        yield: <Welcome />
      });
    }
  });

  Router.public.route('/welcome', {
    name: 'welcome',
    action() {
      ReactLayout.render(App, {
        yield: <Welcome />
      });
    }
  });
})();
