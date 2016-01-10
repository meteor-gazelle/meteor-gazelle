let userPermissionsSchema = new SimpleSchema({
  permissions: {
    type: Object,
    optional: true
  }
});

Meteor.users.attachSchema(userPermissionsSchema);

Permissions = {
  _groups: {},
  _collections: {},
  register (group) {
    // Check that the group is a string
    check(group, String);
    // The group hasn't been defined yet then assign it an empty array to hold the permissions
    if (this._groups[group] === undefined) {
      this._groups[group] = [];
    }
    return {
      add: (permissions) => {
        // Convert passed in permission to an array if necessary
        permissions = Array.isArray(permissions) ? permissions.slice() : [permissions];
        // For each passed in permission
        permissions.forEach(permission => {
          // Check that permission is a string
          check(permission, String);
          // If the permission is duplicate (already been registered) throw an exception
          if (this._groups[group].indexOf(permission) !== -1) {
            throw new Meteor.Error(`Permission ${permission} already registered in group ${group}`);
          }
        });
        // Push the permission onto their corresponding group
        this._groups[group].push(...permissions);
      }
    };
  },
  addPermission (userId, group, permission) {

  },
  removePermission (userId, group, permission) {

  },
  hasPermission (userId, group, permission) {

  }
};
