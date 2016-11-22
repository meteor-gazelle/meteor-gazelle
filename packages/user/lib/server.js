// Publish user profile
Meteor.publish('userProfile', function (userId) {
  if (!this.userId) {
    this.error(new Meteor.Error('user-not-logged-in'));
  }
  return Meteor.users.find(userId, {
    fields: { username: 1 }
  });
});

// Prevent user from updating their document
Meteor.users.deny({
  update: function () {
    return true;
  }
});
