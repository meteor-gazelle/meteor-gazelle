// IpManager.upsertBannedIp unit tests
Tinytest.add('IpManager - upsertBannedIp - record created for specific ban', function (test) {
  var ipAddr = '127.0.0.1';
  var notes = 'China going ham';
  var expireOn = new Date();
  var ipAddrBuf = Ip.toBuffer(ipAddr);

  IpManager.upsertBannedIp(notes, ipAddr, null, expireOn);

  var bannedIp = BannedIps.findOne({
    startIp: ipAddrBuf
  });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.get('notes'), notes);
});

Tinytest.add('IpManager - upsertBannedIp - record created for range ban', function (test) {
  var startIpAddr = '127.0.0.1';
  var endIpAddr = '127.0.0.5';
  var notes = 'Something clever';
  var expireOn = new Date();
  var startIpAddrBuf = Ip.toBuffer(startIpAddr);
  var endIpAddrBuf = Ip.toBuffer(endIpAddr);

  IpManager.upsertBannedIp(notes, startIpAddr, endIpAddr, expireOn);

  var bannedIp = BannedIps.findOne({
    startIp: startIpAddrBuf,
    endIp: endIpAddrBuf
  });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.get('notes'), notes);
});

Tinytest.add('IpManager - upsertBannedIp - existing record updated', function (test) {
  var ipAddr = '127.0.0.1';
  var initialNotes = 'Initial notes';
  var updatedNotes = 'Updated notes';
  var initalExpireOn = new Date();
  var updatedExpireOn = initialExpireOn.getHours() + 1;
  var ipAddrBuf = Ip.toBuffer(ipAddr);

  existingBannedIp = new BannedIp({
    startIp: ipAddrBuf,
    notes: initialNotes,
    expireOn: initalExpireOn
  });
  existingBannedIp.save();

  IpManager.upsertBannedIp(updatedNotes, ipAddr, null, updatedExpireOn);

  var bannedIp = BannedIps.findOne({ startIp: startIpAddrBuf });
  test.isNotUndefined(bannedIp);
  test.isEqual(bannedIp.get('notes'), updatedNotes);
  test.isEqual(bannedIp.get('expireOn'), updatedExpireOn);
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
Tinytest.add('IpManager - exceededLoginAttempts - false return when no record exists', function (test) {
  var ipAddr = '127.0.0.1';

  test.isFalse(IpManager.exceededLoginAttempts(ipAddr));
});

Tinytest.add('IpManager - exceededLoginAttempts - false return when record exists but has expired', function (test) {
  var ipAddr = '127.0.0.1';
  var expiredDate = new Date(1969);

  failedLoginAttempt = new LoginAttempt({
    ip: Ip.toBuffer(ipAddr),
    expireOn: expiredDate
  });
  failedLoginAttempt.save();

  test.isFalse(IpManager.exceededLoginAttempts(ipAddr));
});

Tinytest.add('IpManager - exceededLoginAttempts - false return when record exists, under max attempt count', function (test) {
  var ipAddr = '127.0.0.1';
  var ipAddrBuf = Ip.toBuffer(ipAddr);
  var failedLoginAttempt = new LoginAttempt({
    ip: ipAddrBuf,
    expireOn: IpManager.createExpirationDate(IpManager.ONE_HOUR)
  });
  failedLoginAttempt.save();

  test.isFalse(IpManager.exceededLoginAttempts(ipAddr));
});

Tinytest.add('IpManager - exceededLoginAttempts - true return', function (test) {
  var ipAddr = '127.0.0.1';
  var failedLoginAttempt = new LoginAttempt({
    ip: Ip.toBuffer(ipAddr),
    attempts: IpManager.MAX_LOGIN_ATTEMPTS,
    expireOn: IpManager.createExpirationDate(IpManager.ONE_HOUR)
  });
  failedLoginAttempt.save();

  test.isTrue(IpManager.exceededLoginAttempts(ipAddr));
});

// IpManager.upsertLoginAttempt
Tinytest.add('upsertLoginAttempt - login attempt created when none exists', function (test) {
  var ipAddr = '127.0.0.1';
  var expireOn = new Date();

  IpManager.upsertLoginAttempt(ipAddr, expireOn);

  var actualLoginAttempt = LoginAttempts.findOne({ ip: Ip.toBuffer(ipAddr) });
  test.isNotUndefined(actualLoginAttempt);
  test.isEqual(expireOn, actualLoginAttempt.get('expireOn'));
  test.isEqual(1, actualLoginAttempt.get('attempts'));
});

Tinytest.add('upsertLoginAttempt - login attempt attempts incremented when one exists', function (test) {
  var ipAddr = '127.0.0.1';
  var ipAddrBuf = Ip.toBuffer(ipAddr);
  var failedLoginAttempt = new LoginAttempt({
    ip: ipAddrBuf
  });
  failedLoginAttempt.save();

  IpManager.upsertLoginAttempt(ipAddr);

  var expectedFailedLoginAttemptCount = LoginAttempts.findOne({ ip: ipAddrBuf }).attempts;
  test.isEqual(failedLoginAttempt.attempts + 1, expectedFailedLoginAttemptCount);
});
