Gazelle.schemas.bannedIp = new SimpleSchema({
  startIp: {
    type: Number,
    label: 'The start of the IP range to ban'
  },
  startIpStr: {
    type: String,
    label: 'The start of the IP range to ban'
  },
  endIp: {
    type: Number,
    label: 'The end of the IP range to ban',
    optional: true
  },
  endIpStr: {
    type: String,
    label: 'The end of the IP range to ban',
    optional: true
  },
  notes: Gazelle.schemas.description({label: "The banned ips notes"}),
  createdAt: Gazelle.schemas.createdAt(),
  createdBy: Gazelle.schemas.createdBy(),
  expireOn: {
    type: Date,
    label: 'The date in which the ip ban expires',
    optional: true
  }
});

BannedIp = new Mongo.Collection('bannedIp');

if (Meteor.isServer) {
  BannedIp._ensureIndex({'expireOn': 1}, {expireAfterSeconds: 0});
}

BannedIp.attachSchema(Gazelle.schemas.bannedIp);
