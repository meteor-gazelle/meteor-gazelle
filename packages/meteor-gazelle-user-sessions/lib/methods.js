UserSessionsManager = {
  createUserSession: function (userId, ipAddr, fullUA) {
    Meteor.call('usersessions/createUserSession', userId, ipAddr, fullUA);
  },
  logoutConnectedUsersByIp: function (startIpAddr, endIpAddr) {
    Meteor.call('usersessions/logoutConnectedUsersByIp', startIpAddr, endIpAddr);
  },
  logoutUser: function (userId) {
    Meteor.call('usersessions/logoutUser', userId);
  }
};

Meteor.methods({
  'usersessions/createUserSession': function (userId, ipAddr, fullUA) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var userSession = UserSessions.findOne({ ip: ipAddrBuf, userId: userId });

    if (!userSession) {
      userSession = new UserSession({
        ip: ipAddrBuf,
        userId: userId,
        fullUA: fullUA
      });

      if (userSession.validate()) {
        userSession.save();
      } else {
        // TODO replace with logging when a logging framework is decided upon
        console.log(userSession.getValidationErrors());
      }
      userSession.save();
    }
  },
  'usersessions/logoutConnectedUsersByIp': function (startIpAddr, endIpAddr) {
    if (endIpAddr) {
      UserSessions.find({
        ipAddr: { $gte: Ip.toBuffer(startIpAddr) },
        ipAddr: { $lte: Ip.toBuffer(endIpAddr) }
      }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    } else {
      UserSessions.find({ ipAddr: Ip.toBuffer(startIpAddr) }).forEach(function (userConnection) {
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
