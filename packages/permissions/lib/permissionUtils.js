import { Permissions } from './permissions.js';

const PermissionUtils = {
  ENABLED_PERMISSIONS_FIELD: 'permissionsEnabled',
  DISABLED_PERMISSIONS_FIELD: 'permissionsDisabled',

  getOppositeType(type) {
    return type === PermissionUtils.ENABLED_PERMISSIONS_FIELD ? PermissionUtils.DISABLED_PERMISSIONS_FIELD : PermissionUtils.ENABLED_PERMISSIONS_FIELD;
  },

  findGroupByTitle(group)  {
    return Permissions.findOne({title: group});
  },

  validate(group, permissions) {
    //TODO(ajax) Need a permission to check that user who is running this method actually has permission to edit permissions
    check(group, String);
    check(permissions, [String]);
  },

  validatePermissionType(type) {
    if (type !== PermissionUtils.ENABLED_PERMISSIONS_FIELD && type !== PermissionUtils.DISABLED_PERMISSIONS_FIELD) {
      throw new Meteor.Error('invalid-arguments', 'Invalid permission field name');
    }
  },

  validatePermissionExists(group, permissions) {
    const doc = PermissionUtils.findGroupByTitle(group);
    if (!doc) {
      //TODO(ajax) Find standards for error messages. Expose an Errors key value object for storing them.
      throw new Meteor.Error('invalid-arguments', 'Permission group does not exist');
    }
    if (!doc.permissions || !Array.isArray(doc.permissions)) {
      throw new Meteor.Error('invalid-arguments', 'No permissions in group');
    }
    // Make sure the passed permissions are a proper subset of the registered permissions
    const permissionTitles = doc.permissions.map(value => value.title);
    if (_.difference(permissions, permissionTitles).length > 0) {
      throw new Meteor.Error('invalid-arguments', 'Invalid permission');
    }
  },

  userHasEnabledPermission (userId, group, permissions) {
    return PermissionUtils.userHasPermission(userId, group, permissions, PermissionUtils.ENABLED_PERMISSIONS_FIELD);
  },

  userHasDisabledPermission (userId, group, permissions) {
    return PermissionUtils.userHasPermission(userId, group, permissions, PermissionUtils.DISABLED_PERMISSIONS_FIELD);
  },

  userHasPermission (userId, group, permissions, type) {
    check(userId, String);
    PermissionUtils.validatePermissionType(type);
    PermissionUtils.validate(group, permissions);
    //validatePermissionExists(group, permissions);

    const user = Meteor.users.findOne({_id: userId});
    if (!user) {
      return false;
    }
    const denormalizedPermissions = permissions.map((permission) => PermissionUtils.denormalizeGroupAndPermission(group, permission));

    if (user[type] === undefined) {
      return false;
    }

    const userPermissions = user[type];

    // If a passed in permission doesn't exist, return false, otherwise return true
    return _.difference(denormalizedPermissions, userPermissions).length === 0 ? true : false;
  },

  addPermissions (userId, group, permissions, type) {
    PermissionUtils.validatePermissionType(type);
    PermissionUtils.validate(group, permissions);
    PermissionUtils.validatePermissionExists(group, permissions);

    // Build the query
    const query = {
      $addToSet: {},
      $pull: {}
    };

    // Denormalize the group and permissions
    const denormalizedPermissions = permissions.map((permission) => PermissionUtils.denormalizeGroupAndPermission(group, permission));

    query.$addToSet[type] = {$each: denormalizedPermissions};
    // If the permission is being enabled but already exists in the disabled set, remove it from the disabled set.
    query.$pull[PermissionUtils.getOppositeType(type)] = {$in: denormalizedPermissions};

    // Update the user's permissions
    Meteor.users.update(userId, query);
  },

  removePermissions(userId, group, permissions, type) {
    PermissionUtils.validatePermissionType(type);
    PermissionUtils.validate(group, permissions);
    PermissionUtils.validatePermissionExists(group, permissions);

    // Build the query
    const query = {
      $pull: {}
    };

    // Denormalize the group and permissions
    const denormalizedPermissions = permissions.map((permission) => PermissionUtils.denormalizeGroupAndPermission(group, permission));

    query.$pull[type] = {$in: denormalizedPermissions};

    // Update the user's permissions
    Meteor.users.update(userId, query);
  },

  denormalizeGroupAndPermission(group, permission){
    //TODO(ajax) Make seperator configurable and potentially a disallowed character in permissions and group titles
    return group + ':' + permission;
  }
};

export { PermissionUtils };
