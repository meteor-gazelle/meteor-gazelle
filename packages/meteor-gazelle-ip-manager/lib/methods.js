IpManager = {
  upsertLoginAttempt: function (ipAddr) {
    Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);
  },
  exceededLoginAttempts: function (ipAddr) {
    return Meteor.call('ipmanager/exceededLoginAttempts', ipAddr);
  },
  isBannedIp: function (ipAddr) {
    return Meteor.call('ipmanager/isBannedIp', ipAddr);
  },
  banIpAddress: function (notes, startIpAddr, endIpAddr) {
    Meteor.call('ipmanager/banIpAddress', notes, startIpAddr, endIpAddr);
  },
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPTS_EXCEEDED_TIMEOUT_ONEHOUR: 1,
  INVALID_LOGIN_COUNTER_TIMEOUT_ONEHOUR: 1,
  LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG: 'Maximum failed attempts reached',
  USER_BANNED_ERRORMSG: 'You are banned'
};

Meteor.methods({
  'ipmanager/upsertLoginAttempt': function (ipAddr) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var loginAttempt = LoginAttempts.findOne({ ip: ipAddrBuf });

    if (!loginAttempt) {
      loginAttempt = new LoginAttempt({ ip: ipAddrBuf });
      loginAttempt.setExpireOn();
    } else {
      loginAttempt.incrementInvalidLoginAttempt();
    }

    if (loginAttempt.validate()) {
      loginAttempt.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(loginAttempt.getValidationErrors());
    }
  },
  'ipmanager/exceededLoginAttempts': function (ipAddr) {
    var loginAttempt = LoginAttempts.findOne({ ip: Ip.toBuffer(ipAddr) });
    var attempts = loginAttempt ? loginAttempt.attempts : 0;

    return (attempts >= IpManager.MAX_LOGIN_ATTEMPTS);
  },
  'ipmanager/isBannedIp': function (ipAddr) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var currentDate = new Date();

    var ipIsBanned = BannedIps.findOne({
      $and: [
        { startIp: ipAddrBuf },
        {
          $or: [{ expireOn: { $gte: currentDate }}, { expireOn: { $exists: false }}]
        }
      ]
    });

    if (!ipIsBanned) {
      ipIsBanned = BannedIps.findOne({
        $and: [
          { startIp: { $lte: ipAddrBuf }},
          { endIp: { $gte: ipAddrBuf }},
          {
            $or: [{ expireOn: { $gte: currentDate }}, { expireOn: { $exists: false }}]
          }
        ]
      });
    }

    return ipIsBanned;
  },
  'ipmanager/banIpAddress': function (notes, startIpAddr, endIpAddr) {
    var bannedIp = new BannedIp({
      startIp: Ip.toBuffer(startIpAddr),
      notes: notes
    });

    if (endIpAddr) {
      bannedIp.endIp = Ip.toBuffer(endIpAddr);
    }

    if (bannedIp.validate()) {
      bannedIp.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(bannedIp.getValidationErrors());
    }

    UserSessionsManager.logoutConnectedUsersByIp(startIpAddr, endIpAddr);
  }
});
