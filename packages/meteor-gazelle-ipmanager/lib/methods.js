IpManager = {
  validateLogin: function (allowed, ipAddr) {
    return Meteor.call('ipmanager/validateLogin', allowed, ipAddr);
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
    if (ipAddr[1] >= ipAddr[5]
        || ipAddr[2] >= ipAddr[6]
        || ipAddr[3] >= ipAddr[7]
        || ipAddr[4] >= ipAddr[8]) {
      return false;
    }
    return ipAddr[1] * (ipAddr[0] === 1 || 16777216) + ipAddr[2] * (ipAddr[0] <= 2 || 65536) + ipAddr[3] * (ipAddr[0] <= 3 || 256) + ipAddr[4] * 1;
  }
};

Meteor.methods({
  'ipmanager/validateLogin': function (allowed, ipAddr) {
    if (Meteor.call('ipmanager/ipIsBanned', ipAddr)) {
      throw new Meteor.Error(403, Meteor.settings.USER_BANNED_ERRORMSG);
    }

    if (!allowed) {
      var currentAttemptCount = Meteor.call('ipmanager/validateLoginAttempts', ipAddr);

      if (currentAttemptCount >= Meteor.settings.MAX_LOGIN_ATTEMPTS) {
        Meteor.call('ipmanager/banIpAddress', Meteor.settings.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG, ipAddr);
      }

      return false;
    }

    return true;
  },
  'ipmanager/validateLoginAttempts': function (ipAddr) {
    var loginAttemptsByIp = LoginAttempts.findOne({ ipStr: ipAddr });

    if (loginAttemptsByIp === undefined) {
      loginAttemptsByIp = new LoginAttempt({ ipStr: ipAddr });
    } else {
      loginAttemptsByIp.attempts++;
    }

    Meteor.call('ipmanager/saveLoginAttempt', loginAttemptsByIp, function (err) {
      loginAttemptsByIp.catchValidationException(err);
    });

    return loginAttemptsByIp.attempts;
  },
  'ipmanager/ipIsBanned': function (ipAddr) {
    var ipAddressAsLong = IpManager.ip2long(ipAddr);

    var specificBannedIp = BannedIps.findOne({ startIp: ipAddressAsLong });
    var bannedByRange = BannedIps.findOne({
      startIp: { $lte: ipAddressAsLong },
      endIp: { $gte: ipAddressAsLong }
    });

    return (specificBannedIp !== undefined || bannedByRange !== undefined);
  },
  'ipmanager/banIpAddress': function (notes, startIpAddr, endIpAddr) {
    var bannedIp;
    if (endIpAddr) {
      bannedIp = new BannedIp({
        startIpStr: startIpAddr,
        endIpStr: endIpAddr,
        notes: notes
      });
    } else {
      bannedIp = new BannedIp({
        startIpStr: startIpAddr,
        notes: notes
      });
    }

    Meteor.call('ipmanager/saveBannedIp', bannedIp, function (err) {
      bannedIp.catchValidationException(err);
    });

    Meteor.call('ipmanager/logoutConnectedUsersByIp', startIpAddr, endIpAddr);
  },
  'ipmanager/logoutConnectedUsersByIp': function (startIpAddr, endIpAddr) {
    if (endIpAddr) {
      UserConnection.find({
        ipAddr: { $gte: startIpAdddr },
        ipAddr: { $lte: endIpAddr }
      }).forEach(function (userConnection) {
        Meteor.call('ipmanager/logoutUser', userConnection.userId);
      });
    } else {
      UserConnection.find({ ipAddr: ipAddr }).forEach(function (userConnection) {
        Meteor.call('ipmanager/logoutUser', userConnection.userId);
      });
    }
  },
  'ipmanager/logoutUser': function (userId) {
    Meteor.users.update(userId, {
      $set: {
        'resume.loginTokens': [],
        'services.resume.loginTokens': [],
        'profile.forceLogOut': true
      }
    });
  },
  'ipmanager/saveBannedIp': function (bannedIp) {
    if (bannedIp.validate()) {
      bannedIp.save();
      return bannedIp;
    }

    bannedIp.throwValidationException();
  },
  'ipmanager/saveLoginAttempt': function (loginAttempt) {
    if (loginAttempt.validate()) {
      loginAttempt.save();
      return loginAttempt;
    }

    loginAttempt.throwValidationException();
  }
});
