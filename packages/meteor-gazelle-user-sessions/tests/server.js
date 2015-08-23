Tinytest.add('UserSessionsManager - createUserSession - creates a record', function (test) {
  var userId = 'Some user';
  var ipAddr = '127.0.0.1';
  var fullUA = 'Some user-agent string';

  UserSessionsManager.createUserSession(userId, ipAddr, fullUA);

  test.isNotUndefined(UserSessions.findOne({
    ip: Ip.toBuffer(ipAddr),
    userId: userId
  }));
});

Tinytest.add('UserSessionsManager - logoutConnectionUsersByIp - users logged out by range', function (test) {

});

Tinytest.add('UserSessionsManager - logoutConnectionUsersByIp - users logged out by specific ip address', function (test) {

});

Tinytest.add('UserSessionsManager - logoutUser - user logged out', function (test) {

});
