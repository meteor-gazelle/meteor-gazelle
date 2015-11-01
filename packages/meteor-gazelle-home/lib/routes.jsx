//TODO(ajax) Should the page where the user is redirected to be configurable?
Router.app.route('/home', {
  name: 'home',
  action: function (params, queryParams) {
    //ReactLayout.render(AppLayout)
    ReactLayout.render(AppLayout, {content: <Home />});
  }
});
