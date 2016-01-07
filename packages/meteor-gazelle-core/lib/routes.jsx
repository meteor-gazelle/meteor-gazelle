//TODO(ajax) Should this be moved down into lib package?

FlowRouter.route('/', {
  name: 'index',
  action: function (params, queryParams) {
    ReactLayout.render(Components.App, {yield: <Components.Welcome />});
  }
});


//Router.main.route('/', {
//  name: 'index',
//  action: function (params, queryParams) {
//    if (Meteor.userId()) {
//      FlowRouter.redirect('/home');
//    } else {
//      FlowRouter.redirect('/welcome');
//    }
//  }
//});
