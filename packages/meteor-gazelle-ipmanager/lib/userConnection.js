Schemas = {};

// TODO(rhomes) Ajax was mentioning other fields to track here, need to follow up.
Schemas.userConnection = new SimpleSchema({
  ip: {
    type: Number,
    label: 'The ip address where the connection originated.'
  },
  userId: {
    type: String,
    label: 'The user id of the connected user.'
  }
  //createdAt: Gazelle.schemas.createdAt()
});

UserConnection = new Mongo.Collection('userConnection');
UserConnection.attachSchema(Schemas.userConnection);
