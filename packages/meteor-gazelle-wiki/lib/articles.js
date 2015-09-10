// TODO(shindig): Add createdBy behavior.
// TODO(shindig): Articles readable/writable based on user class.
Articles = new Mongo.Collection('Articles');
Article = Astro.Class({
  name: 'Article',
  collection: Articles,
  fields: {
    createdBy: 'string',
    title: 'string',
    sections: 'array',
    'sections.$': {
      type: 'object',
      default: {}
    },
    'sections.$.title': 'string',
    'sections.$.body': 'string',
    'sections.$.image': {
      type: 'string',
      default: ''
    },
    locked: {
      type: 'boolean',
      default: false
    },
    aliases: 'array',
    'aliases.$': 'string'
  },
  validators: {
    sections: Validators.array(),
    'sections.$.title': Validators.string(),
    'sections.$.body': Validators.string(),
    'sections.$.image': Validators.string(),
    locked: [
      Validators.boolean(),
      Validators.notNull()
    ]
  },
  behaviors: ['timestamp']
});

// Adds revision history feature
Articles.attachCollectionRevision();