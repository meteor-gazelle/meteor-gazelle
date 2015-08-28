IpManager = {
  upsertAndCheckLoginAttempts: function (ipAddr) {
    Meteor.call('ipmanager/upsertAndCheckLoginAttempts', ipAddr);
  },
  isBannedIp: function (ipAddr) {
    return Meteor.call('ipmanager/isBannedIp', ipAddr);
  },
  upsertBannedIp: function (notes, startIpAddr, endIpAddr, expireOn) {
    Meteor.call('ipmanager/upsertBannedIp', notes, startIpAddr, endIpAddr, expireOn);
  },
  LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG: 'Maximum failed attempts reached',
  USER_BANNED_ERRORMSG: 'You are banned'
};

Meteor.methods({
  'ipmanager/upsertLoginAttempt': function (ipAddr) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var loginAttempt = LoginAttempts.findOne({ ip: ipAddrBuf });

    if (!loginAttempt) {
      loginAttempt = new LoginAttempt({ ip: ipAddrBuf });
    } else {
      // Reuse the expired document
      if (loginAttempt.get('expireOn') < new Date()) {
        loginAttempt.setAttempts(1);
      } else {
        loginAttempt.setAttempts(loginAttempt.get('attempts') + 1);
      }
    }

    loginAttempt.setExpireOn(Meteor.settings.ONE_HOUR);

    if (loginAttempt.validate()) {
      loginAttempt.save();
    } else {
      // TODO(rhomes) replace with logging when a logging framework is decided upon
      console.log(loginAttempt.getValidationErrors());
    }
  },
  'ipmanager/exceededLoginAttempts': function (ipAddr) {
    // Locate a non-expired failed LoginAttempt
    var loginAttempt = LoginAttempts.findOne({
      ip: Ip.toBuffer(ipAddr),
      expireOn: { $gte: new Date() }
    });
    var attempts = loginAttempt ? loginAttempt.get('attempts'): 0;

    return (attempts >= Meteor.settings.MAX_LOGIN_ATTEMPTS);
  },
  'ipmanager/upsertAndCheckLoginAttempts': function (ipAddr) {
    Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);

    // Ip addresses which have exceeded the login attempts are banned
    if (Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)) {
      var expireOn = new Date();
      expireOn.setHours(expireOn.getHours() + Meteor.settings.ONE_HOUR);

      IpManager.upsertBannedIp(
        IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG,
        ipAddr,
        null,
        expireOn);

      throw new Meteor.Error(403, IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG);
    }
  },
  'ipmanager/isBannedIp': function (ipAddr) {
    var ipAddrBuf = Ip.toBuffer(ipAddr);
    var currentDate = new Date();

    // Determine if the given ip address is banned specifically
    var ipIsBanned = BannedIps.findOne({
      $and: [
        { startIp: ipAddrBuf },
        {
          $or: [{ expireOn: { $gte: currentDate }}, { expireOn: null }]
        }
      ]
    });

    if (!ipIsBanned) {
      // Determine if the given ip address falls within a banned ip range
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
  'ipmanager/upsertBannedIp': function (args) {
    args.startIp = Ip.toBuffer(args.startIp);
    var searchArgs = {
      startIp: args.startIp
    };

    if (args.endIp) {
      args.endIp = Ip.toBuffer(bannedIp.endIp);
      searchArgs.endIp = args.endIp;
    }

    var bannedIp = BannedIps.findOne(searchArgs);
    if (!bannedIp) {
      bannedIp = new BannedIp(args);
    }

    bannedIp.set({
      notes: args.notes,
      expireOn: args.expireOn
    });

    if (bannedIp.validate()) {
      bannedIp.save();
    } else {
      // TODO(rhomes) replace with logging when a logging framework is decided upon
      console.log(bannedIp.getValidationErrors());
    }

    UserSessionsManager.logoutConnectedUsersByIp(startIpAddr, endIpAddr);
  }
});

