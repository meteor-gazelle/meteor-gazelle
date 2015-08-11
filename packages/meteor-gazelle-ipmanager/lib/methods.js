IpManager = {
  validateLogin: function (allowed, ipAddr) {
    return Meteor.call('validateLogin', allowed, ipAddr);
  },
  upsertUserConnection: function (ipAddr) {
    return Meteor.call('upsertUserConnection', ipAddr);
  },
  ip2long: function (ipAddr) {
    var i = 0;
    ipAddr = ipAddr.match(
      /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
    );
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
    if (ipAddr[1] >= ipAddr[5] || ipAddr[2] >= ipAddr[6] || ipAddr[3] >= ipAddr[7] || ipAddr[4] >= ipAddr[8]) {
      return false;
    }
    return ipAddr[1] * (ipAddr[0] === 1 || 16777216) + ipAddr[2] * (ipAddr[0] <= 2 || 65536) + ipAddr[3] * (ipAddr[0] <= 3 || 256) + ipAddr[4] * 1;
  }
};

Meteor.methods({
  validateLogin: function (allowed, ipAddr) {
    if (Meteor.call('validateIpBanned', ipAddr)) {
      throw new Meteor.Error(403, 'You are banned');
    }

    if (!allowed) {
      var currentAttemptCount = Meteor.call('validateLoginAttempts', ipAddr);

      if (currentAttemptCount >= Meteor.settings.MAX_LOGIN_ATTEMPTS) {
        Meteor.call('banIpAddress', ipAddr, 'Exceeded login attempts');
      }

      return false;
    }

    return true;
  },
  validateLoginAttempts: function (ipAddr) {
    var attempts;

    var loginAttemptsByIp = LoginAttempt.findOne({ipStr: ipAddr});
    if (loginAttemptsByIp === undefined) {
      // TODO(rhomes) default values
      var expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      attempts = 1;

      var newLoginAttempt = {
        ip: IpManager.ip2long(ipAddr),
        ipStr: ipAddr,
        attempts: attempts,
        expireOn: expirationDate
      };

      LoginAttempt.insert(newLoginAttempt);
    }
    else {
      attempts = loginAttemptsByIp.attempts + 1;
      LoginAttempt.update(
        {_id: loginAttemptsByIp._id},
        {$set: {attempts: attempts}}
      );
    }

    return attempts;
  },
  validateIpBanned: function (ipAddr) {
    var ipAddressAsLong = IpManager.ip2long(ipAddr);

    var specificBannedIp = BannedIp.findOne({startIp: ipAddressAsLong});
    var bannedByRange = BannedIp.findOne({startIp: {$lte: ipAddressAsLong}, endIp: {$gte: ipAddressAsLong}});

    return (specificBannedIp !== undefined || bannedByRange !== undefined);
  },
  banIpAddress: function (ipAddr, notes) {
    // TODO(rhomes) Default values
    var expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    var bannedIp = {
      startIp: IpManager.ip2long(ipAddr),
      startIpStr: ipAddr,
      notes: notes,
      expireOn: expirationDate
    };

    BannedIp.insert(bannedIp);
    Meteor.call('logoutConnectedUsersByIp', ipAddr);
  },
  logoutConnectedUsersByIp: function (ipAddr) {
    // TODO(rhomes) need to take into account for banned ranges
    UserConnection.find({ipAddr: ipAddr}).forEach(function (userConnection) {
      Meteor.users.update(userConnection.userId, {
        $set: {
          'resume.loginTokens': [],
          'services.resume.loginTokens': [],
          'profile.forceLogOut': true
        }
      });
    });
  },
  upsertUserConnection: function (ipAddr) {
    // TODO(rhomes) implementation
  }
});
