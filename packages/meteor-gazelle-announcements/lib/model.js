_Announcements = new Mongo.Collection('announcements');

Announcement = Astro.Class({
  'name': 'Announcement',
  'collection': _Announcements,
  fields: {
    'title': {
      type: 'string',
      default: 'New announcement title'
    },
    'body': {
      type: 'string',
      default: 'New announcement body'
    }
  },
  behaviors: ['timestamp']
});
