SitePermissions = {
  registeredPermissions: {},
  permissionExists: function (key, permission) {
    return this.registeredPermissions !== undefined && this.registeredPermissions[key].indexOf(permission) >= 0;
  },
  register: function (permissions) {
    // TODO(ajax) Add validation to ensure object is of correct structure, see
    // TODO(ajax) Keep the registeredPermissions object sorted
    for (var key in permissions) {
      // If there are already registered permissions for this key, append the
      // permissions to the array.
      if (Array.isArray(this.registeredPermissions[key])) {
        this.registeredPermissions[key] = this.registeredPermissions[key].concat(permissions[key]);
      } else if (Array.isArray(permissions[key])) {
        this.registeredPermissions[key] = permissions[key];
      }
    }
  }
};

Permissions = {
  enabled: function(userId, obj) {
    return Meteor.call('permissions/enabled', userId, obj);
  },
  disabled: function(obj) {
    return Meteor.call('permissions/disabled', userId, obj);
  }
};

Meteor.methods({
  'permissions/enabled': function(userId, obj) {
  },
  'permissions/disabled': function(userId, obj) {
  }
});
