describe('Users', function () {
  beforeEach(function () {
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
    it('returns true when a user can login', function () {
      var username = 'testuser';
      Meteor.users.insert({
        'username': username,
        'enabled': true
      });

      expect(Meteor.call('userCanLogin', username)).toBe(true);
    });

    it('returns false when a user can', function () {
      var existingUser = 'testuser';
      var invalidUser = 'I dont exist';
      Meteor.users.insert({ 'username': existingUser });

      expect(Meteor.call('userCanLogin', invalidUser)).toBe(false);
    });
  });
});
