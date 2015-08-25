CreatedByTesters = new Mongo.Collection('createdByTesters');
CreatedByTester = Astro.Class({
  name: 'CreatedByTester',
  collection: 'CreatedByTesters',
  fields: {
    postContent: 'string'
  },
  // Validators not should be added by the behavior.
  behaviors: [
    'createdby'
  ]
});