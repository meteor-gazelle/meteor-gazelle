const permissionsSchema = new SimpleSchema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String
  },
  permissions: {
    type: [new SimpleSchema({
      title: {
        type: String,
        index: true
      },
      description: {
        type: String
      }
    })],
    index: true,
    defaultValue: []
  }
});

PermissionsCollection = new Meteor.Collection('permissions');
PermissionsCollection.attachSchema(permissionsSchema);

//TODO(ajax) Consider key names in schema. Should this be a sub document instead?
let userPermissionsSchema = new SimpleSchema({
  permissionsEnabled: {
    type: [String],
    optional: true,
    index: true
  },
  permissionsDisabled: {
    type: [String],
    optional: true,
    index: true
  }
});

Meteor.users.attachSchema(userPermissionsSchema);
