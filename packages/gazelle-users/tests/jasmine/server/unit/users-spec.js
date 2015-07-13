/*
 * Server unit tests automatically do this, but it's good to see how to install
 * meteor API stubs for other tests which don't auto-do this presently.
 */
beforeEach(function () {
  MeteorStubs.install();
  mock(global, 'User');
});

afterEach(function () {
  MeteorStubs.uninstall();
});

describe('createNewUser method', function () {
  var testUserParams = {
    username: 'test_user',
    password: 'hello',
    email: 'hello'
  };
  it('Calls Accounts.createUser', function () {
    spyOn(Accounts, 'createUser');
    Meteor.call('createNewUser', testUserParams);
    expect(Accounts.createUser).toHaveBeenCalledWith(testUserParams);
  });
});
