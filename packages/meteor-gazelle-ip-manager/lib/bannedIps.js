BannedIps = new Mongo.Collection('bannedIps');
BannedIp = Astro.Class({
  name: 'BannedIp',
  collection: BannedIps,
  fields: {
    startIp: 'object',
    endIp: 'object',
    notes: 'string',
    expireOn: 'date',
    createdAt: 'date',
    createdBy: 'string'
  },
  indexes: {
    startIpIdx: {
      fields: {
        startIp: 1
      },
      options: {}
    },
    startIpEndIpIdx: {
      fields: {
        startIp: 1,
        endIp: 1
      },
      options: {}
    }
  },
  validators: {
    startIp: [
      Validators.required(),
      Validators.object()
    ],
    endIp: Validators.object(),
    notes: Validators.string(),
    expireOn: Validators.date()
  },
  methods: {
    setExpireOn: function () {
      if (!this.expireOn) {
        var expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + IpManager.LOGIN_ATTEMPTS_EXCEEDED_TIMEOUT_ONEHOUR);
        this.expireOn = expirationDate;
      }
    }
  }
});
