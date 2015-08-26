LoginAttempts = new Mongo.Collection('loginAttempts');
LoginAttempt = Astro.Class({
  name: 'LoginAttempt',
  collection: LoginAttempts,
  fields: {
    ip: 'object',
    attempts: {
      type: 'number',
      default: 1
    },
    expireOn: 'date'
  },
  indexes: {
    ipIdx: {
      fields: {
        ip: 1
      },
      options: {}
    }
  },
  validators: {
    ip: [
      Validators.required(),
      Validators.object()
    ],
    expireOn: [
      Validators.required(),
      Validators.date()
    ],
    attempts: [
      Validators.required(),
      Validators.number()
    ]
  },
  behaviors: ['timestamp']
});
