Schema = {};

Schema.userClass = new SimpleSchema({
  title: (new SimpleSchemaFields('user class')).title(),
  shortTitle: (new SimpleSchemaFields('user class short title')).title(),
  secondary: {
    type: Boolean,
    label: 'Secondary user class',
    optional: true,
    defaultValue: false
  },
  roles: {
    type: [String],
    label: 'The roles this class carries'
  }
});

Schema.userClassLite = new SimpleSchema([
  Schema.userClass.pick(['title', 'shortTitle', 'secondary']), {
    classId: {
      type: String,
      label: 'The ID of the class',
      allowedValues: function () {
        var values = [];
        UserClass.find({}, {
          fields: {
            '_id': 1
          }
        }).forEach(function (element) {
          values.push(element._id);
        });
        return (values.length !== 0) ? values : ['none'];
      },
      autoform: {
        type: 'select',
        label: false,
        options: function () {
          var options = [];
          UserClass.find({}, {
            fields: {
              'title': 1,
              '_id': 1
            }
          }).forEach(function (element) {
            options.push({
              label: element.title,
              value: element._id
            });
          });
          return options;
        }
      }
    }
  }]);

Schema.user = new SimpleSchema({
  classes: {
    type: [Schema.userClassLite],
    label: 'The user\'s classes',
    optional: true
  }
});

Users._collection.attachSchema(Schema.user);
