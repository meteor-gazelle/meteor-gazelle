describe('UserSessions', function () {
  beforeEach(function () {
    Gazelle.schemas.UserSessions.remove({});
    Meteor.users.remove({});
  });

  describe('upsertUserSession', function () {
    it('creates a record for a user sessions', function () {
      var userId = 'TestUserId';
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var fullUA = 'Heres some user agent info';

      UserSessionsManager.upsertUserSession(userId, ipAddr, fullUA);

      var updatedUserSession = Gazelle.schemas.UserSessions.findOne({
        userId: userId,
        ip: ipAddrBuf
      });
      expect(updatedUserSession).toBeDefined();
    });

    it('updates a record for a user sessions', function () {
      var userId = 'TestUserId';
      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var initialFullUA = 'Heres some user agent info';
      var updatedFullUA = 'Heres some updated user agent info';

      Gazelle.schemas.UserSessions.insert({
        userId: userId,
        ip: ipAddrBuf,
        fullUA: initialFullUA
      });

      UserSessionsManager.upsertUserSession(userId, ipAddr, updatedFullUA);

      var updatedUserSession = Gazelle.schemas.UserSessions.findOne({
        userId: userId,
        ip: ipAddrBuf
      });
      expect(updatedUserSession).toBeDefined();
      expect(updatedUserSession.get('fullUA')).toEqual(updatedFullUA);
    });
  });

  describe('logoutConnectedUsersByIp', function () {
    it('logs out multiple users within same ip address when specific ip address banned', function () {
      var username1 = 'User 1';
      var username2 = 'User 2';
      var servicesResumeLoginToken = 'services.resume.loginToken';
      var resumeLoginToken = 'resume.loginToken';

      var userArgs = {
        username: username1,
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
      };

      var user1 = Meteor.users.insert(userArgs);

      userArgs.username = username2;
      var user2 = Meteor.users.insert(userArgs);

      var ipAddr = '127.0.0.1';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var fullUA = 'Heres some user agent info';

      Gazelle.schemas.UserSessions.insert({
        userId: user1,
        ip: ipAddrBuf,
        fullUA: fullUA
      });

      Gazelle.schemas.UserSessions.insert({
        userId: user2,
        ip: ipAddrBuf,
        fullUA: fullUA
      });

      UserSessionsManager.logoutConnectedUsersByIp(ipAddr);

      user1 = Meteor.users.findOne({ username: username1 });
      expect(user1).toBeDefined();
      expect(user1.resume.loginTokens).toEqual([]);
      expect(user1.services.resume.loginTokens).toEqual([]);
      expect(user1.profile.forceLogOut).toEqual(true);

      user2 = Meteor.users.findOne({ username: username2 });
      expect(user2).toBeDefined();
      expect(user2.resume.loginTokens).toEqual([]);
      expect(user2.services.resume.loginTokens).toEqual([]);
      expect(user2.profile.forceLogOut).toEqual(true);
    });

    it('logs out multiple users with different ip addresses when ip address range banned', function () {
      var username1 = 'User 1';
      var username2 = 'User 2';
      var servicesResumeLoginToken = 'services.resume.loginToken';
      var resumeLoginToken = 'resume.loginToken';

      var userArgs = {
        username: username1,
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
      };

      var user1 = Meteor.users.insert(userArgs);

      userArgs.username = username2;
      var user2 = Meteor.users.insert(userArgs);

      var ipAddr = '127.0.0.1';
      var ipAddr2 = '127.0.0.2';
      var ipAddrBuf = Ip.toBuffer(ipAddr);
      var ipAddr2Buf = Ip.toBuffer(ipAddr2);
      var fullUA = 'Heres some user agent info';

      Gazelle.schemas.UserSessions.insert({
        userId: user1,
        ip: ipAddrBuf,
        fullUA: fullUA
      });

      Gazelle.schemas.UserSessions.insert({
        userId: user2,
        ip: ipAddr2Buf,
        fullUA: fullUA
      });

      UserSessionsManager.logoutConnectedUsersByIp(ipAddr, ipAddr2);

      user1 = Meteor.users.findOne({ username: username1 });
      expect(user1).toBeDefined();
      expect(user1.resume.loginTokens).toEqual([]);
      expect(user1.services.resume.loginTokens).toEqual([]);
      expect(user1.profile.forceLogOut).toEqual(true);

      user2 = Meteor.users.findOne({ username: username2 });
      expect(user2).toBeDefined();
      expect(user2.resume.loginTokens).toEqual([]);
      expect(user2.services.resume.loginTokens).toEqual([]);
      expect(user2.profile.forceLogOut).toEqual(true);
    });
  });

  describe('logoutUser', function () {
    it('sets the logout fields of the user document', function () {
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

      Meteor.call('usersessions/logoutUser', user);

      user = Meteor.users.findOne({ username: username });
      expect(user).toBeDefined();
      expect(user.resume.loginTokens).toEqual([]);
      expect(user.services.resume.loginTokens).toEqual([]);
      expect(user.profile.forceLogOut).toEqual(true);
    });
  });
});
