CreatedByTesters = new Mongo.Collection('createdByTesters');
CreatedByTester = Astro.Class({
  name: 'CreatedByTester',
  collection: 'CreatedByTesters',
  fields: {
    postContent: 'string'
  },
  behaviors: [
    'createdby'
  ]
});