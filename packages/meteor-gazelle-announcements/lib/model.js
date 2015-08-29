// TODO(ajax) Add user classes
// TODO(ajax) Announcement create hook
// TODO(ajax) Add createdBy behavior

Announcements = new Mongo.Collection('announcements');
// TODO(ajax) Does it need to be exposed?
Gazelle.announcements = Announcements;

Announcement = Astro.Class({
  'name': 'Announcement',
  'collection': Announcements,
  fields: {
    'title': {
      type: 'string',
    },
    'body': {
      type: 'string',
    },
    'type': {
      type: 'string'
    }
  },
  validators: {
    'title': Validators.required(),
    'body': Validators.required(),
    'type': Validators.choice([AnnouncementType.news, AnnouncementType.blog])
  },
  index: {
    'title': {
      fields: {
        'title': 1
      }
    },
    'type': {
      fields: {
        'type': 1
      }
    }
  },
  behaviors: ['timestamp']
});

Meteor.methods({
  'announcements/upsert': function(doc){
    check(doc, Schemas.create);

    announcement = new Announcement();

    announcement.set('title', doc.title);
    announcement.set('body', doc.body);
    announcement.set('type', doc.type);

    announcement.save();
  },
});
