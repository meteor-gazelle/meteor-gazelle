IpManager = {
  validateLogin: function (allowed, ipAddr) {
    if (!allowed) {
      var currentAttemptCount = this.validateLoginAttempts(ipAddr);

      if (currentAttemptCount >= Meteor.settings.MAX_LOGIN_ATTEMPTS) {
        this.banIpAddress(ipAddr, 'Exceeded login attempts');
      }

      if (this.validateIpBanned(ipAddr)) {
        throw new Meteor.Error(403, 'You are banned');
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
        ip: ip2long(ipAddr),
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
    var ipAddressAsLong = ip2long(ipAddr);

    var specificBannedIp = BannedIp.findOne({startIp: ipAddressAsLong});
    var bannedByRange = BannedIp.findOne({startIp: {$lte: ipAddressAsLong}, endIp: {$gte: ipAddressAsLong}});

    return (specificBannedIp !== undefined || bannedByRange !== undefined);
  },
  banIpAddress: function (ipAddr, notes) {
    // TODO(rhomes) Default values
    var expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1);
    var bannedIp = {
      startIp: ip2long(ipAddr),
      startIpStr: ipAddr,
      notes: notes,
      expireOn: expirationDate
    };

    BannedIp.insert(bannedIp);
    this.logoutConnectedUsersByIp(ipAddr);
  },
  logoutConnectedUsersByIp: function (ipAddr) {
    // TODO(rhomes) need to take into account for banned ranges
    UserStatus.connections.find({ipAddr: ipAddr}).forEach(function (onlineUserStatus) {
      Meteor.users.update(onlineUserStatus.userId, {
        $set: {
          'resume.loginTokens': [],
          'services.resume.loginTokens': [],
          'profile.forceLogOut': true
        }
      });
    });
  }
};

Meteor.methods({
  'ipmanager/validateLogin': function (allowed, ipAddr) {
  },
  'ipmanager/validateLoginAttempts': function (ipAddr) {
  },
  'ipmanager/validateIpBanned': function (ipAddr) {
  },
  'ipmanager/banIpAddress': function (ipAddr, notes) {
  },
  'ipmanager/logoutConnectedUsersByIp': function (ipAddr) {
  }
});
