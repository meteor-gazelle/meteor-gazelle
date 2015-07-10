Meteor.publish('userClasses', function () {
  return UserClass.find();
});
