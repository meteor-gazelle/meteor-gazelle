BannedIps = new Mongo.Collection('bannedIps');
BannedIp = Astro.Class({
  name: 'BannedIp',
  collection: BannedIps,
  fields: {
    startIp: 'number',
    endIp: 'number',
    notes: 'string',
    expireOn: 'date',
    createdAt: 'date',
    createdBy: 'string',
    isIpv6: 'boolean'
  },
  indexes: {
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
      Validators.number()
    ],
    endIp: Validators.number(),
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
