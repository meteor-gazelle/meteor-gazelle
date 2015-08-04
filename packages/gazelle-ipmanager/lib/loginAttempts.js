Gazelle.schemas.loginAttempt = new SimpleSchema({
  ip: {
    type: Number,
    label: 'The ip address where the login attempt originated.'
  },
  ipStr: {
    type: String,
    label: 'The string format of the ip address'
  },
  attempts: {
    type: Number,
    label: 'The amount of login attempts'
  },
  expireOn: {
    type: Date,
    label: 'The date in which the login attempt expires'
  },
  createdAt: Gazelle.schemas.createdAt()
});

LoginAttempt = new Mongo.Collection('loginAttempt');

if (Meteor.isServer) {
  LoginAttempt._ensureIndex({'expireOn': 1}, {expireAfterSeconds: 0});
}

LoginAttempt.attachSchema(Gazelle.schemas.loginAttempt);
