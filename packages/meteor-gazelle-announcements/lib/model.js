var collection = new Mongo.Collection('announcements');

// TODO(ajax) Investigate validation
// TOOD(ajax) Add user classes
// TOOD(ajax) Announcement create hook
Announcement = Astro.Class({
  'name': 'Announcement',
  'collection': collection,
  fields: {
    'title': {
      type: 'string',
      default: 'New announcement title'
    },
    'body': {
      type: 'string',
      default: 'New announcement body'
    },
    'type': {
      type: 'string',
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
  'announcements/create': function(doc){
    check(doc, Schemas.create);

    announcement = new Announcement();

    announcement.set('title', doc.title);
    announcement.set('body', doc.body);
    announcement.set('type', doc.type);

    announcement.save();
  },
});
