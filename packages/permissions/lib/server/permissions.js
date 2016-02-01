Permissions.register = function (permissionGroup) {
  // Only accept argument of type PermissionGroup
  if (permissionGroup instanceof PermissionGroup) {
    PermissionsCollection.upsert({title: permissionGroup.title}, {
      $set: {
        title: permissionGroup.title,
        description: permissionGroup.description,
        permissions: permissionGroup.permissions
      }
    });
  }
  else {
    throw new Meteor.Error('invalid-parameter', 'Permissions.register expects a PermissionGroup');
  }
};

