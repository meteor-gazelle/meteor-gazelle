Router.public.route('/welcome', {
  name: 'welcome',
  action: function (params, queryParams) {
    ReactLayout.render(Layout, {content: <Welcome />});
  }
});

Router.public.route('/login', {
  name: 'login',
  action: function (params, queryParams) {
    ReactLayout.render(Layout, {content: <Login />});
  }
});

Router.public.route('/register', {
  name: 'register',
  action: function (params, queryParams) {
    ReactLayout.render(Layout, {content: <Register />});
  }
});
