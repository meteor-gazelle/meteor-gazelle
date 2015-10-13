describe('Users', function () {
  beforeEach(function () {
    // Work with a clean database.
    Meteor.users.remove({});
  });

  describe('createNewUser', function () {
    it('creates an Account record', function () {
      var user = {
        'username': 'testuser',
        'password': 'lol',
        'email': 'meteor@gazelle.com'
      };
      spyOn(Accounts, 'createUser');

      Meteor.call('createNewUser', user);

      expect(Accounts.createUser).toHaveBeenCalledWith(user);
    });
  });

  describe('userExists', function () {
    it('returns true when a user exists', function () {
      var username = 'testuser';
      Meteor.users.insert({ 'username': username });

      expect(Meteor.call('userExists', username)).toBe(true);
    });

    it('returns false when a user does not exist', function () {
      var existingUser = 'testuser';
      var invalidUser = 'I dont exist';
      Meteor.users.insert({ 'username': existingUser });

      expect(Meteor.call('userExists', invalidUser)).toBe(false);
    });
  });

  describe('userCanLogin', function () {
    it('returns true when an enabled user can log in', function () {
      var username = 'testuser';
      Meteor.users.insert({
        'username': username,
        'enabled': true
      });

      expect(Meteor.call('userCanLogin', username)).toBe(true);
    });

    it('returns false when an non-existing user cannot log in', function () {
      var existingUser = 'testuser';
      var invalidUser = 'I dont exist';
      Meteor.users.insert({ 'username': existingUser });

      expect(Meteor.call('userCanLogin', invalidUser)).toBe(false);
    });

    it('returns false when a disabled user cannot log in', function () {

      var existingUser = 'existingUser';
      var disabledUser = 'disabledUser';

      // Use a non-empty db.
      Meteor.users.insert({ 'username': existingUser });

      Meteor.users.insert({
        'username': disabledUser,
        'enabled': false
      });

      expect(Meteor.call('userCanLogin', disabledUser)).toBe(false);
    });
  });
});
