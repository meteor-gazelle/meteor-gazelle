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
    if (Meteor.isClient) {
      console.log('Validating username...');
      var self = this;
      Meteor.call('userExists', value, function (err, userExists) {
        if (!userExists) {
          self.setSuccess();
        } else {
          self.setError(userExists);
        }
        self.setValidating(false);
      });
      return;
    }
    return Meteor.call('userExists', value);
  }
});
