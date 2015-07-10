User = new Mongo.Collection('user');
User.attachSchema(Schemas.user);
//User.timestampable();
//User.createdBy();

// On Client and Server
EasySearch.createSearchIndex('users', {
  'use': 'mongo-db',
  'field': ['_id', 'username'],
  'collection': User,
  'limit': 20
});
