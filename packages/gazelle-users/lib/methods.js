Meteor.methods({
  userExists: function (username) {
    return Meteor.users.find({ 'username': username }).count() > 0;
  },
  userCanLogin: function (username) {
    return Meteor.users.find({
      'username': username,
      'enabled': true
    }).count() > 0;
  },
  createNewUser: function (doc) {
    Accounts.createUser({
      username: doc.username,
      password: doc.password,
      email: doc.email
    });
  }
});
