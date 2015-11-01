//TODO(ajax) Should this be moved down into lib package?
Router.main.route('/', {
  name: 'index',
  action: function (params, queryParams) {
    if (Meteor.userId()) {
      FlowRouter.redirect('/home');
    } else {
      FlowRouter.redirect('/welcome');
    }
  }
});
