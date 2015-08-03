Users.findById = function(userId) {
  return Meteor.call('users/findById', userId);
};

Users.findByName = function(username) {
  return Meteor.call('users/findByName', username);
};

Users.exists = function(username) {
  return Meteor.call('users/exists', username);
};

Users.canLogin = function(username) {
  return Meteor.call('users/canLogin', username);
};

Meteor.methods({
  'users/findById': function (userId) {
    return Users._collection.findOne({id: userId});
  },
  'users/findByName': function (username) {
    return Users._collection.findOne({username: username});
  },
  'users/exists': function (username) {
    return Users._collection.find({'username': username}).count() > 0;
  },
  'users/canLogin': function (username) {
    return Users._collection.find({
        'username': username,
        'enabled': true
      }).count() > 0;
  },
  'users/createNewUser': function (doc) {
    Accounts.createUser({
      username: doc.username,
      password: doc.password,
      email: doc.email
    });
  }
});
