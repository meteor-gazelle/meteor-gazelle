Tinytest.add('Createdby - On create, records creator (also as updater)',
                                                        function (test) {
  // Arrange
  var cbt = new CreateByTester();
  var postData = 'Important news and blog information!1';

  // Act
  cbt.set(postContent, postData);

  // Assert
  var creator = cbt.get(createdBy);
  var updater = cbt.get(updatedBy);
  test.isNotNull(creator);
  test.equal(creator, Meteor.userId());
  test.isNotNull(updater);
  test.equal(updater, Meteor.userId());
});

Tinytest.add('Createdby - On update, records who made original & updates',
                                                          function (test) {
  // Arrange
  var cbt = new CreateByTester();
  var postData = 'Important news and blog information!1';
  var newPostData = 'More Important news and blog information!1';

  // Act
  cbt.set(postContent, postData);
  cbt.set(postContent, newPostData);

  // Assert
  var updaters = cbt.get(updatedBy);
  test.instanceOf(updaters, array);
  test.equal(updaters.length, 2);
  test.equal(updaters[0], Meteor.userId());
  test.equal(updaters[1], Meteor.userId());
});