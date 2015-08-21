UserSessionsManager = {
  createUserSession: function (userId, ipAddr, fullUA) {
    Meteor.call('usersessions/createUserSession', userId, ipAddr, fullUA);
  },
  logoutConnectedUsersByIp: function (startIpAddr, endIpAddr) {
    Meteor.call('usersessions/logoutConnectedUsersByIp', startIpAddr, endIpAddr);
  }
};

Meteor.methods({
  'usersessions/createUserSession': function (userId, ipAddr, fullUA) {
    var userSession = UserSessions.findOne({ ip: ipAddr, userId: userId });

    if (userSession === undefined) {
      userSession = new UserSession({
        ip: Ip.toBuffer(ipAddr),
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
  'usersessions/logoutConnectedUsersByIp': function (startIpAddrBuf, endIpAddrBuf) {
    if (endIpAddrBuf) {
      UserSessions.find({
        ipAddr: { $gte: startIpAddrBuf },
        ipAddr: { $lte: endIpAddrBuf }
      }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    } else {
      UserSessions.find({ ipAddr: ipAddr }).forEach(function (userConnection) {
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
