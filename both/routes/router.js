Router.configure({
  layoutTemplate: 'layout'
});

Router.plugin('ensureSignedIn');

Router.checkUserRoles = function (roles) {
  var hasRole = Roles.userHasRoles(Meteor.userId(), roles);
  if (!hasRole) {
    this.go('error-403');
  }
  return hasRole;
};

Router.map(function () {
  this.route('signOut', {
    path: '/signout',
    onBeforeAction: function () {
      Meteor.logout();
      Router.go('/');
    }
  });

  this.route('error-403', {
    path: 'error-403',
    template: 'error403'
  });
});
