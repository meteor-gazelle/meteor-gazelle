//TODO(ajax) Should the page where the user is redirected to be configurable?

//import { App } from 'meteor/meteor-gazelle:core';
import { Router } from 'meteor/meteor-gazelle:router';
import { Home } from './components/Home.jsx';

export default (() => {
  Router.private.homeRoutes = Router.private.group({
    name: 'home'
  });

  Router.private.homeRoutes.route('/home', {
    name: 'home',
    action: function (params, queryParams) {
      ReactLayout.render(App, {
        yield: <Home />
      });
    }
  });

})();
