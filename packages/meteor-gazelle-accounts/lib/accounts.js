if (Meteor.isServer) {
  Accounts.onCreateUser(function (options, user) {
    User.insert({
      _id: user._id,
      username: user.username,
      enabled: true
    });
    return user;
  });

  Accounts.validateLoginAttempt(function (options) {
    var validLogin = options.allowed;
    var ipAddr = options.connection.clientAddress;
    if (IpManager.isBannedIp(ipAddr)) {
      throw new Meteor.Error(403, IpManager.USER_BANNED_ERRORMSG);
    }

    if (!validLogin && !IpManager.upsertAndValidateLoginAttempts(ipAddr)) {
      throw new Meteor.Error(403, IpManager.LOGIN_ATTEMPTS_EXCEEDED_ERRORMSG);
    }

    return validLogin;
  });

  Accounts.onLogin(function (user) {
    UserSessionsManager.upsertUserSession(user.user._id, user.connection.clientAddress, user.connection.httpHeaders['user-agent']);
  });
}

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/',
  template: 'login',
  redirect: '/home'
});

AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true,
  func: function (value) {
    var self = this;
    if (Meteor.isClient) {
      Meteor.call('userCanLogin', value, function (error, result) {
        if (!result) {
          self.setSuccess();
        } else {
          self.setError(error);
        }
        self.setValidating(false);
      });
    } else {
      return Meteor.call('userCanLogin', value);
    }
  }
});
