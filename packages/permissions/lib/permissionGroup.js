function validatePermissions(permissions) {
  // Create an array
  permissions = Array.isArray(permissions) ? permissions.slice() : [permissions];

  if (_.without(permissions, this.permissions).length > 0) {
    throw new Meteor.Error('invalid-argument', 'An invalid permission was supplied');
  }

  return permissions;
}

PermissionGroup = class PermissionGroup {
  constructor(title, description, permissions) {
    check(title, String);
    check(description, String);

    this.title = title;
    this.description = description;
    this.permissions = [];
    // Keeps track of added permission titles to avoid duplicates
    this.addedPermissions = [];
    this.addPermissions(permissions);
  }

  addPermissions(permissions) {
    // Convert passed in permission to an array if necessary
    permissions = Array.isArray(permissions) ? permissions.slice() : [permissions];
    // For each passed in permission
    permissions.forEach(permission => {
      // Check that the title and description properties are set
      if (!permission.hasOwnProperty('title') || !permission.hasOwnProperty('description')) {
        throw new Meteor.Error('invalid-permission-format',
          `A permission provided to the ${this.title} group is missing a title and/or description`)
      }
      // Check that the title and description are strings
      check(permission.title, String);
      check(permission.description, String);
      // If the permission is a duplicate (already been added to the group) throw an exception
      if (_.contains(this.addedPermissions, permission.title)) {
        throw new Meteor.Error(`Permission ${permission.title} already in group ${this.title}`);
      }
      // Add the permission
      this.permissions.push(permission);
    });
  }

  userEnabledPermissions(permissions) {
    permissions = validatePermissions(permissions);
    return Permissions.methods.isEnabledPermissions(this.title, permissions)
  }

  userDisabledPermissions(permissions) {
    permissions = validatePermissions(permissions);
    return Permissions.methods.isDisabledPermissions(this.title, permissions)
  }
};
