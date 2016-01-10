User = {};

if (Meteor.isServer) {
  User.exists = (userId) => {
    return !!Meteor.users.findOne(userId);
  };
}
