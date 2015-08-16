UserSessionsManager = {
  createUserSession: function (userId, ipAddr, fullUA) {
    Meteor.call('usersessions/createUserSession', userId, ipAddr, fullUA);
  }
};

Meteor.methods({
  'usersessions/createUserSession': function (userId, ipAddr, fullUA) {
    var userSession = UserSessions.findOne({ip: ipAddr, userId: userId});

    if (userSession === undefined) {
      userSession = new UserSession({
        ip: IpManager.ip2long(ipAddr),
        userId: userId,
        fullUA: fullUA
      });

      Meteor.call('usersessions/saveUserSession', userSession);
    }
  },
  'usersessions/saveUserSession': function (userSession) {
    if (userSession.validate()) {
      userSession.save();
      return userSession;
    }

    userSession.throwValidationException();
  }
});
