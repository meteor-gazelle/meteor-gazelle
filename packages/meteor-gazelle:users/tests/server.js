Tinytest.add('Users - createNewUser', function (test) {
  Meteor.users.remove({});
  spies.create('createUser', Accounts, 'createUser');
  var user = {
    'username': 'testuser',
    'password': 'lol',
    'email': 'meteor@gazelle.com'
  };
  Meteor.call('createNewUser', user);
  // make sure this went through Accounts.createUser
  expect(spies.createUser).to.have.been.calledWith(user);
  spies.restoreAll();
  // clean up our mess
  Meteor.users.remove({});
});

Tinytest.add('Users - userExists - truthy', function (test) {
  Meteor.users.remove({});
  Meteor.users.insert({ 'username': 'testuser' });
  var doesUserExist = Meteor.call('userExists', 'testuser');
  test.isTrue(doesUserExist);
  // clean up our mess
  Meteor.users.remove({});
});

Tinytest.add('Users - userExists - falsy', function (test) {
  // make sure nothing is around
  Meteor.users.remove({});
  var doesUserExist = Meteor.call('userExists', 'testuser');
  test.isFalse(doesUserExist);
});

Tinytest.add('Users - userCanLogin - truthy', function (test) {
  Meteor.users.remove({});
  Meteor.users.insert({
    'username': 'testuser',
    'enabled': true
  });
  var canLogin = Meteor.call('userCanLogin', 'testuser');
  test.isTrue(canLogin);
  // clean up our mess
  Meteor.users.remove({});
});

Tinytest.add('Users - userCanLogin - falsy', function (test) {
  Meteor.users.remove({});
  Meteor.users.insert({
    'username': 'testuser',
    'enabled': false
  });
  var canLogin = Meteor.call('userCanLogin', 'testuser');
  test.isFalse(canLogin);
  // clean up our mess
  Meteor.users.remove({});
});
