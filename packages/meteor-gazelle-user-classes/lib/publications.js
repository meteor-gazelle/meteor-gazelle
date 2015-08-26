Meteor.publish('user-classes-management', function() {
  //TODO(ajax) Permission check
  return UserClasses.find();
});
