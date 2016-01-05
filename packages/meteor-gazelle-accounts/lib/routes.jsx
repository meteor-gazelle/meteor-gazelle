Router.public = FlowRouter.group({name: 'public'});

Router.authenticated = FlowRouter.group({name: 'authenticated'});

Router.public.route('/welcome', {
  name: 'welcome',
  action() {
    ReactLayout.render(Components.App, {yield: <Welcome />});
  }
});

Router.public.route('/login', {
  name: 'login',
  action() {
    ReactLayout.render(Components.App, {yield: <Components.Login />});
  }
});

Router.public.route('/register', {
  name: 'register',
  action() {
    ReactLayout.render(Components.App, {yield: <Register />});
  }
});
