BannedIps = new Mongo.Collection('bannedIps');
BannedIp = Astro.Class({
  name: 'BannedIp',
  collection: BannedIps,
  fields: {
    startIp: 'number',
    endIp: 'number',
    startIpStr: 'string',
    endIpStr: 'string',
    notes: 'string',
    expireOn: 'date',
    createdAt: 'date',
    createdBy: 'string'
  },
  indexes: {
    startIpEndIp: {
      fields: {
        startIp: 1,
        endIp: 1
      },
      options: {}
    }
  },
  methods: {
    resolveStartIp: function () {
      if (this.startIpStr && !this.startIp) {
        this.startIp = IpManager.ip2long(this.startIpStr)
      }
    },
    resolveEndIp: function () {
      if (this.endIpStr && !this.endIp) {
        this.endIp = IpManager.ip2long(this.endIpStr)
      }
    },
    setExpireOn: function () {
      if (!this.expireOn) {
        var expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + Meteor.settings.LOGIN_ATTEMPTS_EXCEEDED_TIMEOUT);
        this.expireOn = expirationDate;
      }
    }
  },
  events: {
    beforeinsert: function () {
      this.resolveStartIp();
      this.resolveEndIp();
      this.setExpireOn();
    }
  }
});

if (Meteor.isServer) {
  BannedIps._ensureIndex({'expireOn': 1}, {expireAfterSeconds: 0});
}

