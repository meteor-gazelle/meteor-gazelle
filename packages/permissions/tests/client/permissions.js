if (Meteor.isClient) {

  Accounts.createUser({
    email: 'email@email.com',
    username: 'username',
    password: 'password'
  });

  Meteor.loginWithPassword('username', 'password');

  Tinytest.add('Permissions.test', function (test) {
    console.log(Meteor.userId());
    test.ok(true);
  });
}
