UserClassesController = ApplicationController.extend({
  waitOn: function () {
    return Meteor.subscribe('user-classes-management');
  },
  data: function () {
    return {
      userClasses: UserClasses.find()
    }
  },
  userClassesManagement: function () {
    this.render('userClassesManagement');
  },
});

// TOOD(ajax) Permission check to only allow users with correct perms
Router.route('/user-classes', {
  name: 'userClassesManagement',
  controller: UserClassesController,
});
