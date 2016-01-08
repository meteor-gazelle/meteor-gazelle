//TODO(ajax) Should the page where the user is redirected to be configurable?

const homeRoutes = FlowRouter.group({
  name: 'home'
});

homeRoutes.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    ReactLayout.render(App, {
      yield: <Home />
    });
  }
});

homeRoutes.route('/test', {
  name: 'test',
  action: function (params, queryParams) {
    ReactLayout.render(App, {
      yield: <Test />
    });
  }
});

