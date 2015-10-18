Meteor.users.attachSchema(Gazelle.schema.user);

AccountsTemplates.configure({
  defaultLayout: 'accountsLayout',
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

// Add a username field to user accounts.
AccountsTemplates.addField({
  _id: 'username',
  type: 'text',
  required: true
});
