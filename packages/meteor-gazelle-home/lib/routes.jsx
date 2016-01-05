//TODO(ajax) Should the page where the user is redirected to be configurable?

Router.authenticated.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    ReactLayout.render(Components.App, {yield: <Home />});
  }
});
