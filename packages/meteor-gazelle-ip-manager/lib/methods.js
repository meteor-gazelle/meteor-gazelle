IpManager = {
  validateLogin: function (allowed, ipAddr) {
    return Meteor.call('ipmanager/validateLogin', allowed, ipAddr);
  },
  exceededLoginAttempts: function (ipAddr) {
    return Meteor.call('ipmanager/exceededLoginAttempts', allowed, ipAddr);
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
  'ipmanager/validateLogin': function (allowed, ipAddr) {
    if (Meteor.call('ipmanager/isBannedIp', ipAddr)) {
      throw new Meteor.Error(403, IpManager.USER_BANNED_ERRORMSG);
    }

    if (!allowed && Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)) {
      // Ban ip and throw a 403 and a new message?
      Meteor.call('ipmanager/banIpAddress', IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG, ipAddr);
    }

    return allowed;
  },
  'ipmanager/exceededLoginAttempts': function (ipAddr) {
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

    return (loginAttempt.attempts >= IpManager.MAX_LOGIN_ATTEMPTS);
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
