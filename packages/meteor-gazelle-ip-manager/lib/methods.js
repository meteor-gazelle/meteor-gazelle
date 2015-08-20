IpUtils = {
  VALID_IP_FORMAT: /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i,
  ip2long: function (ipAddr) {
    // TODO(rhomes) needs to handle IPv6 addresses
    var i = 0;
    ipAddr = ipAddr.match(this.VALID_IP_FORMAT);
    if (!ipAddr) {
      return false;
    }

    ipAddr[0] = 0;
    for (i = 1; i < 5; i += 1) {
      ipAddr[0] += !! ((ipAddr[i] || '')
        .length);
      ipAddr[i] = parseInt(ipAddr[i]) || 0;
    }

    ipAddr.push(256, 256, 256, 256);

    ipAddr[4 + ipAddr[0]] *= Math.pow(256, 4 - ipAddr[0]);
    if (ipAddr[1] >= ipAddr[5]
      || ipAddr[2] >= ipAddr[6]
      || ipAddr[3] >= ipAddr[7]
      || ipAddr[4] >= ipAddr[8]) {
      return false;
    }
    return ipAddr[1] * (ipAddr[0] === 1 || 16777216) + ipAddr[2] * (ipAddr[0] <= 2 || 65536) + ipAddr[3] * (ipAddr[0] <= 3 || 256) + ipAddr[4] * 1;
  }
};

IpManager = {
  validateLogin: function (allowed, ipAddr) {
    return Meteor.call('ipmanager/validateLogin', allowed, ipAddr);
  },
  MAX_LOGIN_ATTEMPTS: 5,
  LOGIN_ATTEMPTS_EXCEEDED_TIMEOUT_ONEHOUR: 1,
  INVALID_LOGIN_COUNTER_TIMEOUT_ONEHOUR: 1,
  LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG: "Maximum failed attempts reached",
  USER_BANNED_ERRORMSG: "You are banned"
};

Meteor.methods({
  'ipmanager/validateLogin': function (allowed, ipAddr) {
    if (Meteor.call('ipmanager/isBannedIp', ipAddr)) {
      throw new Meteor.Error(403, IpManager.USER_BANNED_ERRORMSG);
    }

    if (!allowed && Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)) {
      Meteor.call('ipmanager/banIpAddress', IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG, ipAddr);
    }

    return allowed;
  },
  'ipmanager/exceededLoginAttempts': function (ipAddr) {
    var ipAddrAsLong = IpUtils.ip2long(ipAddr);
    var loginAttempt = LoginAttempts.findOne({ ip: ipAddrAsLong });

    if (!loginAttempt) {
      loginAttempt = new LoginAttempt({ ip: ipAddrAsLong });
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
    var ipAddrAsLong = IpUtils.ip2long(ipAddr);
    var currentDate = new Date();

    var ipIsBanned = BannedIps.findOne({
      $and: [
        { startIp: ipAddrAsLong },
        {
          $or: [{ expireOn: { $gte: currentDate }}, { expireOn: { $exists: false }}]
        }
      ]
    });

    if (!ipIsBanned) {
      ipIsBanned = BannedIps.findOne({
        $and: [
          { startIp: { $lte: ipAddrAsLong }},
          { endIp: { $gte: ipAddrAsLong }},
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
      startIp: IpUtils.ip2long(startIpAddr),
      notes: notes
    });

    if (endIpAddr) {
      bannedIp.endIp = IpUtils.ip2long(endIpAddr);
    }

    if (bannedIp.validate()) {
      bannedIp.save();
    } else {
      // TODO replace with logging when a logging framework is decided upon
      console.log(bannedIp.getValidationErrors());
    }

    UserSessionsManager.logoutConnectedUsersByIp(startIpAddr, endIpAddr, function (err) {
      // TODO replace with logging when a logging framework is decided upon
      console.log(err);
    });
  }
});
