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
    var validLogin;
    // TODO(rhomes) why is this being called twice on the server?
    console.log('validateLoginAttempt called');

    try {
      validLogin = IpManager.validateLogin(options.allowed, options.connection.clientAddress);
    } catch (ex) {
      throw ex;
    }

    return validLogin;
  });

  Accounts.onLogin(function (user) {
    // TODO(rhomes) why is this being called twice on the server?
    console.log('onLogin event called');
    UserSessionsManager.createUserSession(user.user._id, user.connection.clientAddress, user.connection.httpHeaders['user-agent']);
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
