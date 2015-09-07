UserSessionsManager = {
  upsertUserSession: function (userId, ipAddr, fullUA) {
    Meteor.call('usersessions/upsertUserSession', userId, ipAddr, fullUA);
  },
  logoutConnectedUsersByIp: function (startIpAddr, endIpAddr) {
    Meteor.call('usersessions/logoutConnectedUsersByIp', startIpAddr, endIpAddr);
  }
};

Meteor.methods({
  'usersessions/upsertUserSession': function (userId, ipAddr, fullUA) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var userSession = UserSessions.findOne({ ip: ipAddrBuf, userId: userId });

    if (!userSession) {
      userSession = new UserSession({
        ip: ipAddrBuf,
        userId: userId
      });
    }

    userSession.set('fullUA', fullUA);

    if (userSession.validate()) {
      userSession.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(userSession.getValidationErrors());
    }
  },
  'usersessions/logoutConnectedUsersByIp': function (startIpAddr, endIpAddr) {
    if (endIpAddr) {
      UserSessions.find({
        ip: { $gte: Ip.toBuffer(startIpAddr) },
        ip: { $lte: Ip.toBuffer(endIpAddr) }
      }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    } else {
      UserSessions.find({ ip: Ip.toBuffer(startIpAddr) }).forEach(function (userConnection) {
        Meteor.call('usersessions/logoutUser', userConnection.userId);
      });
    }
  },
  'usersessions/logoutUser': function (userId) {
    Meteor.users.update({
      _id: userId
    }, {
      $set: {
        'resume.loginTokens': [],
        'services.resume.loginTokens': [],
        'profile.forceLogOut': true
      }
    });
  }
});
