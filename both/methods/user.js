Meteor.methods({
  userExists: function (username) {
    return Meteor.users.findOne({
      username: username
    });
  },
  createNewUser: function (doc) {
    Accounts.createUser({
      username: doc.username,
      password: doc.password,
      email: doc.email
    });
  }
});

if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    User.insert({
      _id: user._id,
      username: user.username,
      enabled: true
    });
    return user;
  });
}
