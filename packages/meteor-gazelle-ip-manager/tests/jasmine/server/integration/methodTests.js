describe('IpManager', function () {
  beforeEach(function () {
    Gazelle.schemas.BannedIps.remove({});
    Gazelle.schemas.LoginAttempts.remove({});
  });

  describe('upsertBannedIp', function () {
    it('creates a record for a specific ban', function () {
      var args = {
        startIp: '127.0.0.1',
        notes: 'China going ham',
        expireOn: new Date()
      };

      IpManager.upsertBannedIp(args);

      var bannedIp = Gazelle.schemas.BannedIps.findOne({ startIp: Ip.toBuffer(args.startIp) });
      expect(bannedIp).toBeDefined();
    });

    it('creates a record for a range ban', function () {
      var startIpAddr = '127.0.0.1';
      var endIpAddr = '127.0.0.3';
      var notes = 'Something clever';
      var expireOn = new Date();

      IpManager.upsertBannedIp({
        startIp: startIpAddr,
        endIp: endIpAddr,
        notes: notes,
        expireOn: expireOn
      });

      var bannedIp = Gazelle.schemas.BannedIps.findOne({
        startIp: Ip.toBuffer(startIpAddr),
        endIp: Ip.toBuffer(endIpAddr)
      });

      expect(bannedIp).toBeDefined();
      expect(bannedIp.get('notes')).toEqual(notes);
    });

    it('updates an existing record', function () {
      var ipAddr = '127.0.0.1';
      var initialNotes = 'Initial notes';
      var updatedNotes = 'Updated notes';
      var initialExpireOn = new Date();
      var updatedExpireOn = initialExpireOn;
      updatedExpireOn.setHours(updatedExpireOn.getHours() + Meteor.settings.ONE_HOUR);

      var args = {
        startIp: ipAddr,
        notes: initialNotes,
        expireOn: initialExpireOn
      };

      Gazelle.schemas.BannedIps.insert({
        startIp: Ip.toBuffer(args.startIp),
        notes: initialNotes,
        expireOn: initialExpireOn
      });

      args.notes = updatedNotes;
      args.expireOn = updatedExpireOn;

      IpManager.upsertBannedIp(args);

      var bannedIp = Gazelle.schemas.BannedIps.findOne({ startIp: Ip.toBuffer(ipAddr) });

      expect(bannedIp).toBeDefined();
      expect(bannedIp.get('notes')).toEqual(updatedNotes);
      expect(bannedIp.get('expireOn')).toEqual(updatedExpireOn);
    });

    it('logs out a connected user', function () {
      // Clean up Users and UserSessions
      Meteor.users.remove({});
      Gazelle.schemas.UserSessions.remove({});

      // Simulate a logged in user
      var username = 'Test user';
      var servicesResumeLoginToken = 'services.resume.loginToken';
      var resumeLoginToken = 'resume.loginToken';

      var user = Meteor.users.insert({
        username: username,
        resume: {
          loginTokens: [resumeLoginToken]

        },
        services: {
          resume: {
            loginTokens: [servicesResumeLoginToken]
          }
        },
        profile: {
          forceLogOut: false
        }
      });

      var ipAddr = '127.0.0.1';

      // Create a user session for the above user
      Gazelle.schemas.UserSessions.insert({
        ip: Ip.toBuffer(ipAddr),
        userId: user,
        fullUA: 'A full user agent'
      });

      // Ban the ip address that the above user is connecting from
      var notes = 'Initial notes';
      var expireOn = new Date();
      expireOn.setHours(expireOn.getHours() + Meteor.settings.ONE_HOUR);

      var args = {
        startIp: ipAddr,
        notes: notes,
        expireOn: expireOn
      };

      IpManager.upsertBannedIp(args);

      user = Meteor.users.findOne({ username: username });
      expect(user).toBeDefined();
      expect(user.resume.loginTokens).toEqual([]);
      expect(user.services.resume.loginTokens).toEqual([]);
      expect(user.profile.forceLogOut).toEqual(true);
    });
  });

  describe('isBannedIp', function () {
    it('returns true when an ip address is specifically banned', function () {
      var expectedBannedIp = '127.0.0.1';
      Gazelle.schemas.BannedIps.insert({ startIp: Ip.toBuffer(expectedBannedIp) });

      expect(IpManager.isBannedIp(expectedBannedIp)).toBe(true);
    });

    it('returns true when an ip address is banned by falling within a range', function () {
      var startBannedRange = '127.0.0.1';
      var endBannedRange = '127.0.0.3';

      Gazelle.schemas.BannedIps.insert({
        startIp: Ip.toBuffer(startBannedRange),
        endIp: Ip.toBuffer(endBannedRange)
      });

      var ipAddr = '127.0.0.2';
      expect(IpManager.isBannedIp(ipAddr)).toBe(true);
    });

    it('returns false when an ip address is not banned', function () {
      var bannedIpAddr = '127.0.0.1';
      Gazelle.schemas.BannedIps.insert({ startIp: Ip.toBuffer(bannedIpAddr) });

      var ipAddr = '127.0.0.2';
      expect(IpManager.isBannedIp(ipAddr)).toBe(false);
    });

    it('returns false when the banned ip record is expired', function () {
      var bannedIpAddr = '127.0.0.1';
      var expiredDate = new Date(1969);
      Gazelle.schemas.BannedIps.insert({
        startIp: Ip.toBuffer(bannedIpAddr),
        expireOn: expiredDate
      });

      expect(IpManager.isBannedIp(bannedIpAddr)).toBe(false);
    });

    it('returns true when the banned ip record falls with the expiration date', function () {
      var bannedIpAddr = '127.0.0.1';
      var expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + Meteor.settings.ONE_HOUR);

      Gazelle.schemas.BannedIps.insert({
        startIp: Ip.toBuffer(bannedIpAddr),
        expireOn: expirationDate
      });

      expect(IpManager.isBannedIp(bannedIpAddr)).toBe(true);
    });
  });

  describe('exceededLoginAttempts', function () {
    it('returns false when no failed attempts have been logged', function () {
      var ipAddr = '127.0.0.1';

      expect(Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)).toBe(false);
    });

    it('returns false when failed attempts exist but the record has expired', function () {
      var ipAddr = '127.0.0.1';
      var expiredDate = new Date(1969);

      Gazelle.schemas.LoginAttempts.insert({
        ip: Ip.toBuffer(ipAddr),
        expireOn: expiredDate,
        attempts: Meteor.settings.MAX_LOGIN_ATTEMPTS
      });

      expect(Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)).toBe(false);
    });

    it('returns false when failed attempts exist, but under max attempt count', function () {
      var ipAddr = '127.0.0.1';
      var expireOn = new Date();
      expireOn.setHours(expireOn.getHours() + Meteor.settings.ONE_HOUR);

      Gazelle.schemas.LoginAttempts.insert({
        ip: Ip.toBuffer(ipAddr),
        expireOn: expireOn,
        attempts: 2
      });

      expect(Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)).toBe(false);
    });

    it('returns true when ip exceeded the max attempt count', function () {
      var ipAddr = '127.0.0.1';
      var expireOn = new Date();
      expireOn.setHours(expireOn.getHours() + Meteor.settings.ONE_HOUR);

      var insertedAttempt = Gazelle.schemas.LoginAttempts.insert({
        ip: Ip.toBuffer(ipAddr),
        expireOn: expireOn,
        attempts: Meteor.settings.MAX_LOGIN_ATTEMPTS
      });

      expect(Meteor.call('ipmanager/exceededLoginAttempts', ipAddr)).toBe(true);
    });
  });

  describe('upsertLoginAttempt', function () {
    it('creates a record when none exist', function () {
      var ipAddr = '127.0.0.1';

      Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);

      var insertedAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: Ip.toBuffer(ipAddr) });
      expect(insertedAttempt).toBeDefined();
    });

    it('updates an expired record', function () {
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var initialExpireOn = new Date(1969);
      var initialAttempts = 3;

      Gazelle.schemas.LoginAttempts.insert({
        ip: ipAddrBuf,
        expireOn: initialExpireOn,
        attempts: initialAttempts
      });

      Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);

      var updatedAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: ipAddrBuf });
      expect(updatedAttempt).toBeDefined();
      expect(updatedAttempt.get('attempts')).toEqual(1);
      expect(updatedAttempt.get('expireOn')).toBeGreaterThan(initialExpireOn);
    });

    it('increments a non-expired record', function () {
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var initialExpireOn = new Date();
      initialExpireOn.setMinutes(initialExpireOn.getMinutes() + 1);
      var initialAttempts = 3;

      Gazelle.schemas.LoginAttempts.insert({
        ip: ipAddrBuf,
        expireOn: initialExpireOn,
        attempts: initialAttempts
      });

      Meteor.call('ipmanager/upsertLoginAttempt', ipAddr);

      var updatedAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: ipAddrBuf });
      expect(updatedAttempt).toBeDefined();
      expect(updatedAttempt.get('attempts')).toEqual(initialAttempts + 1);
      expect(updatedAttempt.get('expireOn')).toBeGreaterThan(initialExpireOn);
    });
  });

  describe('upsertAndValidateLoginAttempts', function () {
    it('creates a record when none exist and returns true', function () {
      var ipAddr = '127.0.0.1';

      var isValid = IpManager.upsertAndValidateLoginAttempts(ipAddr);

      var createdAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: Ip.toBuffer(ipAddr) });
      expect(createdAttempt).toBeDefined();
      expect(isValid).toBe(true);
    });

    it('increments a record when one exists and returns true when under max attempt count', function () {
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var initialAttempts = 1;
      var futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + Meteor.settings.ONE_HOUR);

      Gazelle.schemas.LoginAttempts.insert({
        ip: ipAddrBuf,
        attempts: initialAttempts,
        expireOn: futureDate
      });

      var isValid = IpManager.upsertAndValidateLoginAttempts(ipAddr);

      var updatedAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: ipAddrBuf });
      expect(updatedAttempt).toBeDefined();
      expect(updatedAttempt.get('attempts')).toEqual(initialAttempts + 1);
      expect(isValid).toEqual(true);
    });

    it('increments a record when one exists, returns false when max attempt count is hit, and banned ip record created', function () {
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var initialAttempts = Meteor.settings.MAX_LOGIN_ATTEMPTS - 1;
      var futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + Meteor.settings.ONE_HOUR);

      Gazelle.schemas.LoginAttempts.insert({
        ip: ipAddrBuf,
        attempts: initialAttempts,
        expireOn: futureDate
      });

      var isValid = IpManager.upsertAndValidateLoginAttempts(ipAddr);

      var bannedIp = Gazelle.schemas.BannedIps.findOne({ startIp: ipAddrBuf });
      var updatedAttempt = Gazelle.schemas.LoginAttempts.findOne({ ip: ipAddrBuf });

      expect(bannedIp).toBeDefined();
      expect(updatedAttempt).toBeDefined();
      expect(updatedAttempt.get('attempts')).toEqual(initialAttempts + 1);
      expect(isValid).toEqual(false);
    });
  });
});
