UserSessionsManager = {
  createUserSession: function (userId, ipAddr, fullUA) {
    Meteor.call('usersessions/createUserSession', userId, ipAddr, fullUA);
  },
  logoutConnectedUsersByIp: function (startIpAddr, endIpAddr, callback) {
    Meteor.call('usersessions/logoutConnectedUsersByIp', startIpAddr, endIpAddr, callback);
  }
};

Meteor.methods({
  'usersessions/createUserSession': function (userId, ipAddr, fullUA) {
    var userSession = UserSessions.findOne({ ip: ipAddr, userId: userId });

    if (userSession === undefined) {
      userSession = new UserSession({
        ip: IpUtils.ip2long(ipAddr),
        userId: userId,
        fullUA: fullUA
      });

      if (userSession.validate()) {
        userSession.save();
      } else {
        // TODO replace with logging when a logging framework is decided upon
        console.log(userSession.getValidationErrors());
      }
    }
  },
  'usersessions/logoutConnectedUsersByIp': function (startIpAddr, endIpAddr, callback) {
    // TODO how do we want to utilize the callback here?
    if (endIpAddr) {
      UserConnection.find({
        ipAddr: { $gte: startIpAdddr },
        ipAddr: { $lte: endIpAddr }
      }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    } else {
      UserConnection.find({ ipAddr: ipAddr }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    }
  },
  'usersessions/logoutUser': function (userId) {
    Meteor.users.update(userId, {
      $set: {
        'resume.loginTokens': [],
        'services.resume.loginTokens': [],
        'profile.forceLogOut': true
      }
    });
  }
});
