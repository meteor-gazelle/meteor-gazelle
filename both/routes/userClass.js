//TODO: Permissions
Router.map(function () {
  this.route('user-class/create', {
    path: '/user-class/create',
    template: 'userClass'
  });
  this.route('user-class/edit', {
    path: '/user-class/edit',
    template: 'userClass',
    waitOn: function () {
      Meteor.subscribe('userClasses');
    },
    data: {
      userClasses: function () {
        return UserClass.find().fetch();
      }
    }
  });
});
