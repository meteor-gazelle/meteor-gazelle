// IpManager.banIpAddress unit tests
Tinytest.add('IpManager - banIpAddress - record created for specific ban', function (test) {
  // AAA pattern lol
  // Arrange
  var ipAddr = '127.0.0.1';
  var notes = 'China going ham';
  var ipAddrBuf = Ip.toBuffer(ipAddr);

  // Act
  IpManager.banIpAddress(notes, ipAddr);

  // Assert
  var bannedIp = BannedIps.findOne({
    startIp: ipAddrBuf
  });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.notes, notes);
});

Tinytest.add('IpManager - banIpAddress - record created for range ban', function (test) {
  // AAA pattern lol
  // Arrange
  var startIpAddr = '127.0.0.1';
  var endIpAddr = '127.0.0.5';
  var notes = 'Something clever';
  var startIpAddrBuf = Ip.toBuffer(startIpAddr);
  var endIpAddrBuf = Ip.toBuffer(endIpAddr);

  // Act
  IpManager.banIpAddress(notes, startIpAddr, endIpAddr);

  // Assert
  var bannedIp = BannedIps.findOne({
    startIp: startIpAddrBuf,
    endIp: endIpAddrBuf
  });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.notes, notes);
});

// IpManager.isBannedIp unit tests
Tinytest.add('IpManager - isBannedIp - true return for specific ban', function (test) {
  var expectedBannedIp = '127.0.0.1';
  var bannedIp = new BannedIp({ startIp: Ip.toBuffer(expectedBannedIp) });
  bannedIp.save();

  test.isTrue(IpManager.isBannedIp(expectedBannedIp));
});


Tinytest.add('IpManager - isBannedIp - true return for banned by range', function (test) {
  var startBannedRange = '127.0.0.1';
  var endBannedRange = '127.0.0.3';

  var bannedRange = new BannedIp({
    startIp: Ip.toBuffer(startBannedRange),
    endIp: Ip.toBuffer(endBannedRange)
  });
  bannedRange.save();

  var ipAddr = '127.0.0.2';
  test.isTrue(IpManager.isBannedIp(ipAdr));
});

Tinytest.add('IpManager - ipBannedIp - false return for ip not banned', function (test) {
  var bannedIpAddr = '127.0.0.2';
  var bannedIp = new BannedIp({ startIp: Ip.toBuffer(bannedIpAddr) });
  bannedIp.save();

  var ipAddr = '127.0.0.1';
  test.isFalse(IpManager.isBannedIp(idAddr));
});

Tinytest.add('IpManager - isBannedIp - false returned when banned record expired', function (test) {
  var bannedIpAddr = '127.0.0.1';
  var expiredDate = new Date(1969);
  var bannedIp = new BannedIp({
    startIp: Ip.toBuffer(bannedIpAddr),
    expireOn: expiredDate
  });
  bannedIp.save();

  test.isFalse(IpManager.isBannedIp(bannedIpAddr));
});

Tinytest.add('IpManager - isBannedIp - true returned for within expiration date', function (test) {
  var bannedIpAddr = '127.0.0.1';
  var expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 1);
  var bannedIp = new BannedIp({
    startIp: Ip.toBuffer(bannedIpAddr),
    expireOn: expirationDate
  });
  bannedIp.save();

  test.isTrue(IpManager.isBannedIp(bannedIpAddr));
});

// IpManager.exceededLoginAttempts unit tests
Tinytest.add('IpManager - exceededLoginAttempts - false return, failed attempt created', function (test) {
  var ipAddr = '127.0.0.1';

  test.isFalse(IpManager.exceededLoginAttempts(ipAddr));

  var loginAttemptCreated = LoginAttempts.findOne({
    ip: Ip.toBuffer(ipAddr)
  });

  test.isNotUndefined(loginAttemptCreated);
});

Tinytest.add('IpManager - exceededLoginAttempts - false return, failed attempt incremented', function (test) {
  var ipAddr = '127.0.0.1';
  var ipAddrBuf = Ip.toBuffer(ipAddr);
  var failedLoginAttempt = new LoginAttempt({
    ip: ipAddrBuf
  });
  failedLoginAttempt.save();

  test.isFalse(IpManager.exceededLoginAttempts(ipAddr));
  test.equal(LoginAttempt.findOne({ ip: ipAddrBuf }).attempts, 2);
});

Tinytest.add('IpManager - exceededLoginAttempts - true return', function (test) {
  var ipAddr = '127.0.0.1';
  var failedLoginAttempt = new LoginAttempt({
    ip: Ip.toBuffer(ipAddr),
    attempts: IpManager.MAX_LOGIN_ATTEMPTS
  });
  failedLoginAttempt.save();

  test.isTrue(IpManager.exceededLoginAttempts(ipAddr));
});

// IpManager.validateLogin unit tests
Tinytest.add('IpManager - validateLogin - error thrown when ip is banned', function (test) {
  var ipAddr = '127.0.0.1';
  var bannedIp = new BannedIp({ ip: Ip.toBuffer(ipAddr) });
  bannedIp.save();

  test.throws(IpManager.validateLogin(false, ipAddr), new Meteor.error(401, IpManager.USER_BANNED_ERRORMSG));
});

Tinytest.add('IpManager - validateLogin - false returned when failed login attempts exceeded', function (test) {
  var ipAddr = '127.0.0.1';
  var ipAddrBuf = Ip.toBuffer(ipAddr);
  var failedLoginAttempt = new LoginAttempt({
    ip: ipAddrBuf,
    attempts: IpManager.MAX_LOGIN_ATTEMPTS
  });
  failedLoginAttempt.save();

  test.isFalse(IpManager.validateLogin(false, ipAddr));

  var bannedIp = BannedIps.findOne({
    startIp: ipAddrBuf
  });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.notes, IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG);
});

Tinytest.add('IpManager - validateLogin - true returned when user can login', function (test) {
  test.isTrue(IpManager.validateLogin(true, '127.0.0.1'));
});
