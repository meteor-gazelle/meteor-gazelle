describe('Behavior tests', function () {
  describe('applies the createdAt behavior', function () {
    it('assigns a date on insert', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.createdAt(Tests, 'createdAt');

      var testId = Tests.insert({ text: 'Test text' });
      var test = Tests.findOne({ _id: testId });
      expect(test.createdAt).toBeDefined();
    });
  });

  describe('applies the updatedAt behavior', function () {
    it('assigns a date on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updatedAt(Tests, 'updatedAt');

      var testId = Tests.insert({ text: 'Test text' });
      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updatedAt).toBeDefined();
    });
  });

  describe('applies the updateAtHistory behavior', function () {
    it('assigns a date on update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateAtHistory(Tests, 'updateAtHistory');

      var testId = Tests.insert({ text: 'Test text' });

      Tests.update(
        { _id: testId },
        {
          $set: {
            text: 'Updated text'
          }
        });

      var test = Tests.findOne({ _id: testId });
      expect(test.updateAtHistory).toBeDefined();
      expect(test.updateAtHistory.length).toEqual(1);
    });

    it('appends a date on subsequent update', function () {
      var Tests = new Mongo.Collection(null);
      Behaviors.updateAtHistory(Tests, 'updateAtHistory');
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
      expect(test.updateAtHistory).toBeDefined();
      expect(test.updateAtHistory.length).toEqual(2);
    });
  });
});
