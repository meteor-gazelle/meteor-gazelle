IpManager = {
  createExpirationDate: function (additionalHours) {
    return Meteor.call('ipmanager/createExpirationDate', additionalHours);
  },
  upsertLoginAttempt: function (ipAddr, expireOn) {
    Meteor.call('ipmanager/upsertLoginAttempt', ipAddr, expireOn);
  },
  exceededLoginAttempts: function (ipAddr) {
    return Meteor.call('ipmanager/exceededLoginAttempts', ipAddr);
  },
  isBannedIp: function (ipAddr) {
    return Meteor.call('ipmanager/isBannedIp', ipAddr);
  },
  upsertBannedIp: function (notes, startIpAddr, endIpAddr, expireOn) {
    Meteor.call('ipmanager/upsertBannedIp', notes, startIpAddr, endIpAddr, expireOn);
  },
  MAX_LOGIN_ATTEMPTS: 5,
  ONE_HOUR: 1,
  LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG: 'Maximum failed attempts reached',
  USER_BANNED_ERRORMSG: 'You are banned'
};

Meteor.methods({
  'ipmanager/createExpirationDate': function (additionalHours) {
    var expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + additionalHours);
    return expirationDate;
  },
  'ipmanager/upsertLoginAttempt': function (ipAddr, expireOn) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var loginAttempt = LoginAttempts.findOne({ ip: ipAddrBuf });

    if (!loginAttempt) {
      loginAttempt = new LoginAttempt({
        ip: ipAddrBuf,
        expireOn: expireOn
      });
    } else {
      if
      // if expire on is less than now
        // reset the attempts
        // set the expireOn
      // else
        // increment attempts
        // set the expireOn
      loginAttempt.set({
        attempts: loginAttempt.attempts + 1,
        expireOn: expireOn
      });
    }

    if (loginAttempt.validate()) {
      loginAttempt.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(loginAttempt.getValidationErrors());
    }
  },
  'ipmanager/exceededLoginAttempts': function (ipAddr) {
    var loginAttempt = LoginAttempts.findOne({
      ip: Ip.toBuffer(ipAddr),
      expireOn: { $gte: new Date() }
    });
    var attempts = loginAttempt ? loginAttempt.get('attempts'): 0;

    return (attempts >= IpManager.MAX_LOGIN_ATTEMPTS);
  },
  'ipmanager/isBannedIp': function (ipAddr) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var currentDate = new Date();

    var ipIsBanned = BannedIps.findOne({
      $and: [
        { startIp: ipAddrBuf },
        {
          $or: [{ expireOn: { $gte: currentDate }}, { expireOn: null }]
        }
      ]
    });

    if (!ipIsBanned) {
      ipIsBanned = BannedIps.findOne({
        $and: [
          { startIp: { $lte: ipAddrBuf }},
          { endIp: { $gte: ipAddrBuf }},
          {
            $or: [{ expireOn: { $gte: currentDate }}, { expireOn: null }]
          }
        ]
      });
    }

    return ipIsBanned;
  },
  'ipmanager/upsertBannedIp': function (notes, startIpAddr, endIpAddr, expireOn) {
    var args = { startIp: Ip.toBuffer(startIpAddr) };

    if (endIpAddr) {
      args.endIp = Ip.toBuffer(endIpAddr);
    }

    var bannedIp = BannedIps.findOne(args);
    if (!bannedIp) {
      bannedIp = new BannedIp(args);
    }

    bannedIp.set({
      notes: notes,
      expireOn: expireOn
    });

    if (bannedIp.validate()) {
      bannedIp.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(bannedIp.getValidationErrors());
    }

    UserSessionsManager.logoutConnectedUsersByIp(startIpAddr, endIpAddr);
  }
});

