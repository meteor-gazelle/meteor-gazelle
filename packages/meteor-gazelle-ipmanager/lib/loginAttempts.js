LoginAttempts = new Mongo.Collection('loginAttempts');
LoginAttempt = Astro.Class({
  name: 'LoginAttempt',
  collection: LoginAttempts,
  fields: {
    ip: {
      type: 'number',
      index: 1
    },
    ipStr: 'string',
    attempts: {
      type: 'number',
      default: 1
    },
    expireOn: 'date',
    createdAt: 'date'
  },
  validators: {
    ip: [
      Validators.required(),
      Validators.number()

    ],
    ipStr: [
      Validators.required(),
      Validators.string()
    ],
    expireOn: [
      Validators.required(),
      Validators.date()
    ]
  },
  methods: {
    resolveIp: function () {
      if (this.ipStr && !this.ip) {
        this.ip = IpManager.ip2long(this.ipStr);
      }
    },
    setExpireOn: function () {
      if (!this.expireOn) {
        var expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + Meteor.settings.INVALID_LOGIN_COUNTER_TIMEOUT_ONEHOUR);
        this.expireOn = expirationDate;
      }
    }
  },
  events: {
    beforeinsert: function () {
      this.resolveIp();
      this.setExpireOn();
    }
  }
});

if (Meteor.isServer) {
  LoginAttempts._ensureIndex({'expireOn': 1}, {expireAfterSeconds: 0});
}
