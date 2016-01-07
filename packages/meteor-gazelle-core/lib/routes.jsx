//TODO(ajax) Should this be moved down into lib package?

Router.public.route('/', {
  name: 'index',
  action: function (params, queryParams) {
    ReactLayout.render(Components.App, {yield: <Components.Welcome />});
  }
});
