Gazelle.schemas.user = new SimpleSchema({
  username: {
    type: String,
    label: 'The user\'s name.',
    unique: true,
    index: true
  },
  enabled: {
    type: Boolean,
    label: 'The user\'s account status.'
  }
});

var collection = new Mongo.Collection('user');
collection.attachSchema(Gazelle.schemas.user);
Users._collection = collection;
