Schemas = {};

Schemas.create = new SimpleSchema({
  title: {
    type: String,
    label: 'The announcement\'s title'
  },
  body: {
    type: String,
    label: 'The announcement\'s body'
  },
  type: {
    type: String,
    label: 'The announcement\'s type',
    allowedValues: [AnnouncementType.news, AnnouncementType.blog]
  }
});
