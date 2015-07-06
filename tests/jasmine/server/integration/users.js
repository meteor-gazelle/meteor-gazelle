/*
 * Server unit tests automatically do this, but it's good to see how to install
 * meteor API stubs for other tests which don't auto-do this presently.
 */

beforeEach(function () {
  User.remove({});
  Meteor.users.remove({});
});


describe('createNewUser method', function () {
  var testUserParams = {
    username: 'test_user',
    password: 'hello',
    email: 'hello'
  };
  it('Calls User.insert', function () {
    spyOn(User, 'insert');
    Meteor.call('createNewUser', testUserParams);
    expect(User.insert).toHaveBeenCalled();
  });

  it('Creates a User', function () {
    var u = User.findOne();
    //uh this is what findOne would return right
    expect(u).not.toBe(null);
  });

  it('Creates an Account', function () {
    var u = Meteor.users.findOne();
    //uh this is what findOne would return right
    expect(u).not.toBe(null);
  });

});
