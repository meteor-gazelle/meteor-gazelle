IpManager = {
  upsertAndValidateLoginAttempts: function (ipAddr) {
    return Meteor.call('ipmanager/upsertAndValidateLoginAttempts', ipAddr);
  },
  isBannedIp: function (ipAddr) {
    return Meteor.call('ipmanager/isBannedIp', ipAddr);
  },
  upsertBannedIp: function (args) {
    Meteor.call('ipmanager/upsertBannedIp', args);
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
  'ipmanager/upsertAndValidateLoginAttempts': function (ipAddr) {
    var isValid = true;
    Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);

    // Ip addresses which have exceeded the login attempts are banned
    if (Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)) {
      isValid = false;
      var expireOn = new Date();
      expireOn.setHours(expireOn.getHours() + Meteor.settings.ONE_HOUR);

      IpManager.upsertBannedIp({
        startIp: ipAddr,
        notes: IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG,
        expireOn: expireOn
      });
    }

    return isValid;
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

    return ipIsBanned !== undefined;
  },
  'ipmanager/upsertBannedIp': function (args) {
    var startIpAddr = args.startIp;
    var endIpAddr = args.endIp;
    args.startIp = Ip.toBuffer(args.startIp);
    var searchArgs = { startIp: args.startIp };

    if (args.endIp) {
      args.endIp = Ip.toBuffer(args.endIp);
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

