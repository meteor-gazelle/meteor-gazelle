Schema = {};

var validatePermission = function () {
  if (this.value) {
    var permissionsAreValid = this.value.every(function (currentValue, index, array) {
      return typeof currentValue === 'string'
        && currentValue.indexOf(':') > -1
        && SitePermissions.permissionExists(currentValue.split()[0], currentValue.split()[1])
    });
    if (!permissionsAreValid) {
      return 'Invalid permission';
    }
  }
};

Schema.permissions = new SimpleSchema({
  enabledPermissions: {
    type: [String],
    label: 'The user\'s enabled permissions',
    index: true,
    optional: true,
    custom: validatePermission
  },
  disabledPermissions: {
    type: [String],
    label: 'The user\'s disabled permissions',
    index: true,
    optional: true,
    custom: validatePermission
  }
});

Users._collection.attachSchema(Schema.permissions);
