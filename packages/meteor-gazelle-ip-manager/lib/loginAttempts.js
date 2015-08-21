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
    expireOn: 'date',
    createdAt: 'date'
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
    ]
  },
  methods: {
    setExpireOn: function () {
      if (!this.expireOn) {
        var expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + IpManager.INVALID_LOGIN_COUNTER_TIMEOUT_ONEHOUR);
        this.expireOn = expirationDate;
      }
    },
    incrementInvalidLoginAttempt: function () {
      this.attempts++;
      this.expireOn.setHours(this.expireOn.getHours() + IpManager.INVALID_LOGIN_COUNTER_TIMEOUT_ONEHOUR);
    }
  }
});
