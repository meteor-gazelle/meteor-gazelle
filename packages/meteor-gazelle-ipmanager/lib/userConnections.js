UserConnections = new Mongo.Collection('userConnections');
// TODO(rhomes) parse out fullUA? also need to work out the createdAt behavior
UserConnection = Astro.Class({
  name: 'UserConnection',
  collection: UserConnections,
  fields: {
    ip: {
      type: 'number',
      index: 1
    },
    userId: 'string',
    fullUA: 'string',
    createdAt: 'date'
  }
});
