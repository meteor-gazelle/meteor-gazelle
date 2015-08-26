// TODO(ajax) How to handle ranking

UserClasses = new Mongo.Collection('userClasses');

UserClass = Astro.Class({
  'name': 'UserClass',
  'collection': UserClasses,
  fields: {
    'title': {
      type: 'string',
    },
    'shortTitle': {
      type: 'string',
    },
    'rank': {
      type: 'number'
    },
    'secondary': {
      type: 'boolean',
    },
    // TODO(ajax) How to validate permissions are valid?
    'permissions.$': {
      type: 'array',
      default: []
    },
    'permissions.$': {
      // (ajax) Should this be string or object?
      type: 'string'
    }
  },
  validators: {
    'title': Validators.required(),
    'shortTitle': Validators.required(),
    'secondary': Validators.required()
  },
  behaviors: ['timestamp']
});

Meteor.methods({
  'userClasses/insert': function(doc) {
    check(doc, Forms.userClass);
    var userClass = new UserClass();
    user
  }
})
