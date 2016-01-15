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

let userPermissionsSubSchema = new SimpleSchema({
  groupId: {
    type: String
  },
  permissions: {
    type: [String]
  }
});

let userPermissionsSchema = new SimpleSchema({
  permissionsEnabled: {
    type: [userPermissionsSubSchema],
    optional: true,
    index: true
  },
  permissionsDisabled: {
    type: [userPermissionsSubSchema],
    optional: true,
    index: true
  }
});

Meteor.users.attachSchema(userPermissionsSchema);
