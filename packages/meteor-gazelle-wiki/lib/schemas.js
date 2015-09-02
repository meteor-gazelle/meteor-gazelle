Schemas = {};

Schemas.Article = new SimpleSchema({
  title: {
    type: String,
    label: 'The wiki\'s title',
    unique: true,
    max: 200,
    optional: false
  },
  sections: {
    type: Array,
    label: 'Section(s) of the wiki article',
    optional: false
  },
  'sections.$': {
    type: Object
  },
  'sections.$.title': {
    type: String,
    label: 'Section Title'
  },
  'sections.$.body': {
    type: String,
    label: 'Section Body'
  },
  'sections.$.image': {
    type: String,
    label: 'Image (optional)',
    optional: true
  },
  aliases: {
    type: Array,
    optional: true
  },
  'aliases.$': {
    type: String,
    unique: true
  }
});