const groupSchema = new SimpleSchema({
  title: {
    type: String,
    index: true,
    unique: true
  },
  description: {
    type: String
  }
});

const permissionSchema = new SimpleSchema({
  groupId: {
    type: String,
    index: true
  },
  title: {
    type: String,
    index: true
  },
  description: {
    type: String
  }
});

PermissionGroupsCollection = new Meteor.Collection('permissionGroups');
PermissionGroupsCollection.attachSchema(groupSchema);

PermissionsCollection = new Meteor.Collection('permissions');
PermissionsCollection.attachSchema(permissionSchema);


let userPermissionsSchema = new SimpleSchema({
  permissionsAllowed: {
    type: [String],
    defaultValue: []
  },
  permissionsDenied: {
    type: [String],
    defaultValue: []
  }
});

Meteor.users.attachSchema(userPermissionsSchema);
