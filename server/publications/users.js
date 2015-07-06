Meteor.publish('users', function () {
  return User.find();
});