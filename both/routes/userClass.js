Router.map(function () {
  this.route('userClass/create', {
    path: '/userClass/create',
    template: 'userClass'
  //TODO: Permissions
  });
  this.route('userClass/:id/edit', {
    path: '/userClass/:id/edit',
    template: 'userClass',
    waitOn: function () {
      Meteor.subscribe('userClasses');
      Meteor.subscribe('classes');
    },
    data: {
      userClass: function () {
        return Class.findOne({
          _id: Router.current().params.id
        });
      }
    }
  });
});