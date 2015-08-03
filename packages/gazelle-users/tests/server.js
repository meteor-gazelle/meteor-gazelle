Tinytest.add('Users - createNewUser', function (test) {
  Users._collection.remove({});
  spies.create('createUser', Accounts, 'createUser');
  var user = {
    'username': 'testuser',
    'password': 'lol',
    'email': 'meteor@gazelle.com'
  };
  Meteor.call('users/createNewUser', user);
  // make sure this went through Accounts.createUser
  expect(spies.createUser).to.have.been.calledWith(user);
  spies.restoreAll();
  // clean up our mess
  Users._collection.remove({});
});

Tinytest.add('Users - userExists - truthy', function (test) {
  Users._collection.remove({});
  Users._collection.insert({ 'username': 'testuser', 'enabled': true });
  var doesUserExist = Users.exists('testuser');
  test.isTrue(doesUserExist);
  // clean up our mess
  Users._collection.remove({});
});

Tinytest.add('Users - userExists - falsy', function (test) {
  // make sure nothing is around
  Users._collection.remove({});
  var doesUserExist = Users.exists('testuser');
  test.isFalse(doesUserExist);
});

Tinytest.add('Users - userCanLogin - truthy', function (test) {
  Users._collection.remove({});
  Users._collection.insert({
    'username': 'testuser',
    'enabled': true
  });
  var canLogin = Users.canLogin('testuser');
  test.isTrue(canLogin);
  // clean up our mess
  Users._collection.remove({});
});

Tinytest.add('Users - userCanLogin - falsy', function (test) {
  Users._collection.remove({});
  Users._collection.insert({
    'username': 'testuser',
    'enabled': false
  });
  var canLogin = Users.canLogin('testuser');
  test.isFalse(canLogin);
  // clean up our mess
  Users._collection.remove({});
});
