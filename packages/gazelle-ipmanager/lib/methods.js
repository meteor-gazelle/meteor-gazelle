Meteor.methods({
  validateLogin: function (allowed, ipAddr) {
    if (!allowed) {
      var currentAttemptCount = Meteor.call('validateLoginAttempts', ipAddr);

      if (currentAttemptCount >= Meteor.settings.MAX_LOGIN_ATTEMPTS) {
        Meteor.call('banIpAddress', ipAddr, 'Exceeded login attempts')
      }

      if (Meteor.call('validateIpBanned', ipAddr)) {
        throw new Meteor.Error(403, 'You are banned');
      }

      return true;
    }
  },
  validateLoginAttempts: function (ipAddr) {
    var attempts;
    var loginAttemptsByIp = LoginAttempt.findOne({ipStr: ipAddr});
    if (loginAttemptsByIp === undefined) {
      // TODO(rhomes) default values
      var expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      var newLoginAttempt = {
        ip: ip2long(ipAddr),
        ipStr: ipAddr,
        attempts: 1,
        expireOn: expirationDate
      };

      LoginAttempt.insert(newLoginAttempt);
      attempts = 1;
    }
    else {
      attempts = loginAttemptsByIp.attempts + 1;
      LoginAttempt.update(
        {_id: loginAttemptsByIp._id},
        {$set: {attempts: attempts}}
      );
    }
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
  }
});
