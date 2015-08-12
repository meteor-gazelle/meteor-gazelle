Schemas = {};

Schemas.userConnection = new SimpleSchema({
  ip: {
    type: Number,
    label: 'The ip address where the user connection originated.'
  },
  userId: {
    type: String,
    label: 'The user id of the connected user.'
  },
  fullUA: {
    type: String,
    label: 'The full user-agent of the connected user.'
  }
  //createdAt: Gazelle.schemas.createdAt(),
});

UserConnection = new Mongo.Collection('userConnection');
UserConnection.attachSchema(Schemas.userConnection);
