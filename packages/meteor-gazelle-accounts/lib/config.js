Meteor.users.attachSchema(Gazelle.schema.user);

AccountsTemplates.configure({
  defaultLayout: 'layout',
  defaultContentRegion: 'main',
  showForgotPasswordLink: true,
  enablePasswordChange: true
});

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');


AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true
  /*
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
   */
});
