// TODO(ajax) How to handle ranking

UserClasses = new Mongo.Collection('userClasses');

UserClass = Astro.Class({
  'name': 'UserClass',
  'collection': UserClasses,
  fields: {
    'title': {
      type: 'string',
      default: 'The class title'
    },
    'shortTitle': {
      type: 'string',
      default: 'The shortened class title'
    },
    'ranking': {
      type: 'number'
    },
    'secondary': {
      type: 'boolean',
      default: false
    }
  },
  validators: {
    'title': Validators.required(),
    'shortTitle': Validators.required(),
    'secondary': Validators.required()
  },
  behaviors: ['timestamp']
});
