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

User = new Mongo.Collection('user');
User.attachSchema(Gazelle.schemas.user);
