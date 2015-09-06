BannedIps = new Mongo.Collection('bannedIps');
Gazelle.schemas.BannedIps = BannedIps;
BannedIp = Astro.Class({
  name: 'BannedIp',
  collection: BannedIps,
  fields: {
    startIp: 'object',
    endIp: 'object',
    notes: 'string',
    expireOn: 'date',
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
    endIp: Validators.or([
      Validators.object(),
      Validators.null()
    ]),
    notes: Validators.or([
      Validators.string(),
      Validators.null()
    ]),
    expireOn: Validators.or([
      Validators.date(),
      Validators.null()
    ])
  },
  behaviors: ['timestamp']
});
