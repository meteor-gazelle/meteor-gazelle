Meteor.publish('userClasses', function () {
  return UserClass.find();
});

Meteor.publish('classes', function () {
  return Class.find();
});