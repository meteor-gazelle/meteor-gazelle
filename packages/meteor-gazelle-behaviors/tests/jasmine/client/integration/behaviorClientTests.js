describe('Behavior client tests', function () {
  var username = 'TestUser';
  var password = 'testPassword123';
  var email = 'TestEmail@gmail.com';

  beforeAll(function () {
    Accounts.createUser({
      username: username,
      email: email,
      password: password
    });
  });

  beforeEach(function () {
    Meteor.loginWithPassword({
      user: username,
      password: password
    });
  });

  describe('applies the createdBy behavior', function () {
    it('assigns userId on insert', function () {
      var Tests = new Mongo.Collection('test');
      Behaviors.createdBy(Tests, 'createdBy');

      var testId = Tests.insert({ text: 'Test text' });

      var test = Tests.findOne({ _id: testId });
      expect(test.createdBy).toBeDefined();
    });
  });

  describe('applies the updatedBy behavior', function () {
    it('assigns userId on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updatedBy(Tests, 'updatedBy');

      var testId = Tests.insert({ text: 'Test text' });
      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updatedBy).toBeDefined();
    });
  });

  describe('applies the updateByHistory behavior', function () {
    it('assigns a user id on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateByHistory(Tests, 'updateByHistory');

      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateByHistory).toBeDefined();
      expect(test.updateByHistory.length).toEqual(1);
    });

    it('appends a user id on subsequent update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateByHistory(Tests, 'updateByHistory');
      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Another update'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateByHistory).toBeDefined();
      expect(test.updateByHistory.length).toEqual(2);
    });
  });

  describe('applies multiple behaviors', function () {
    it('same-hook behaviors respected', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.createdBy(Tests, 'createdBy');
      Behaviors.createdAt(Tests, 'createdAt');
      var testId = Tests.insert({ text: 'Test text' });

      var test = Tests.findOne({ _id: testId });
      expect(test.createdBy).toBeDefined();
      expect(test.createdAt).toBeDefined();
    });
  });
});
