//TODO(ajax) Should this be moved down into lib package?

FlowRouter.route('/', {
  action: function (params, queryParams) {
    if (!!Meteor.user()) {
      FlowRouter.go('/home');
    } else {
      FlowRouter.go('/welcome');
    }
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
