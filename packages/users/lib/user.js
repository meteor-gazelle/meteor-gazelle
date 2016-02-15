User = {
  checkLoggedIn (context) {
    if (!context.userId) {
      throw new Meteor.Error('user-not-logged-in',
                             'User must be logged in to access this method.');
    }
  }
};

if (Meteor.isServer) {
  User.exists = (userId) => {
    return !!Meteor.users.findOne(userId);
  };

  // Prevent user from updating their document
  Meteor.users.deny({
    update: function () {
      return true;
    }
  });
}
