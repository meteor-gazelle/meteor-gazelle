Router.map(function () {
  this.route('user/create', {
    path: '/user/create',
    template: 'userCreate',
    before: function () {
      //Router.checkUserRoles(['manage-users']);
      this.next();
    }
  });
  this.route('user/search', {
    path: '/user/search',
    template: 'userSearch'
  });
  this.route('user/:id', {
    path: '/user/:id',
    template: 'userProfile',
    waitOn: function () {
      Meteor.subscribe('users');
    },
    data: {
      user: function () {
        return User.findOne({
          _id: Router.current().params.id
        });
      }
    }
  });
  this.route('user/:id/edit', {
    path: '/user/:id/edit',
    template: 'userEdit',
    waitOn: function () {
      Meteor.subscribe('users');
      Meteor.subscribe('userClasses');
    },
    data: {
      user: function () {
        return User.findOne({
          _id: Router.current().params.id
        });
      }
    }
  });
});
