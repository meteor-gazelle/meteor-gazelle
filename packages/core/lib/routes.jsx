Router.public = FlowRouter.group({
  name: 'public'
});

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

FlowRouter.notFound = {
  action: function () {
    throw new Meteor.Error('Page not found');
  }
};

