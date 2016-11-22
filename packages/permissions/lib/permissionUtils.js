import { Permissions } from './permissions.js';

const PermissionUtils = {
  ENABLED_PERMISSIONS_FIELD: 'permissionsEnabled',
  DISABLED_PERMISSIONS_FIELD: 'permissionsDisabled',

  // Get the opposite permission field
  getOppositeType (type) {
    return type === PermissionUtils.ENABLED_PERMISSIONS_FIELD ?
      PermissionUtils.DISABLED_PERMISSIONS_FIELD :
      PermissionUtils.ENABLED_PERMISSIONS_FIELD;
  },

  // Get a group from the group title
  findGroupByTitle (group)  {
    return Permissions.findOne({title: group});
  },

  // Validate a group and permission
  validate (group, permissions) {
    //TODO(ajax) Need a permission to check that user who is running this
    // method actually has permission to edit permissions
    check(group, String);
    check(permissions, [String]);
  },

  // Validate a permission type
  validatePermissionType (type) {
    if (type !== PermissionUtils.ENABLED_PERMISSIONS_FIELD &&
      type !== PermissionUtils.DISABLED_PERMISSIONS_FIELD) {
      throw new Meteor.Error('invalid-arguments',
        'Invalid permission field name');
    }
  },

  // Validate a permission exists
  validatePermissionExists (group, permissions) {
    permissions = Array.isArray(permissions) ? permissions : [permissions];
    const doc = PermissionUtils.findGroupByTitle(group);
    if (!doc) {
      //TODO(ajax) Find standards for error messages. Expose an Errors key
      // value object for storing them.
      throw new Meteor.Error('invalid-arguments',
        'Permission group does not exist');
    }
    if (!doc.permissions || !Array.isArray(doc.permissions)) {
      throw new Meteor.Error('invalid-arguments', 'No permissions in group');
    }
    // Make sure the passed permissions are a proper subset of the registered
    // permissions
    const permissionTitles = doc.permissions.map(value => value.title);
    if (_.difference(permissions, permissionTitles).length > 0) {
      throw new Meteor.Error('invalid-arguments', 'Invalid permission');
    }
  },

  // Check if a user has an enabled permission
  hasEnabledPermission (userId, group, permissions) {
    return PermissionUtils.userHasPermission(userId, group, permissions,
      PermissionUtils.ENABLED_PERMISSIONS_FIELD);
  },

  // Check if a user has a disabled permission
  hasDisabledPermission (userId, group, permissions) {
    return PermissionUtils.userHasPermission(userId, group, permissions,
      PermissionUtils.DISABLED_PERMISSIONS_FIELD);
  },

  // Check if a user has a permission
  userHasPermission (userId, group, permissions, type) {
    check(userId, String);
    PermissionUtils.validatePermissionType(type);
    PermissionUtils.validate(group, permissions);
    //validatePermissionExists(group, permissions);

    // Get the user
    const user = Meteor.users.findOne({_id: userId});
    if (!user) {
      return false;
    }

    // Denormalize the permissions
    const denormalizedPermissions = permissions.map(
      (permission) =>
        PermissionUtils.denormalizeGroupAndPermission(group, permission));

    if (user[type] === undefined) {
      return false;
    }

    const userPermissions = user[type];

    // If a passed in permission doesn't exist, return false, otherwise return
    // true
    return _.difference(denormalizedPermissions, userPermissions).length === 0
      ? true : false;
  },

  // Add permissions to a user
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
    const denormalizedPermissions = permissions.map(
      (permission) =>
        PermissionUtils.denormalizeGroupAndPermission(group, permission));

    query.$addToSet[type] = {$each: denormalizedPermissions};
    // If the permission is being enabled but already exists in the disabled
    // set, remove it from the disabled set.
    query.$pull[PermissionUtils.getOppositeType(type)] =
    {$in: denormalizedPermissions};

    // Update the user's permissions
    Meteor.users.update(userId, query);
  },

  // Remove permissions from a user
  removePermissions (userId, group, permissions, type) {
    PermissionUtils.validatePermissionType(type);
    PermissionUtils.validate(group, permissions);
    PermissionUtils.validatePermissionExists(group, permissions);

    // Build the query
    const query = {
      $pull: {}
    };

    // Denormalize the group and permissions
    const denormalizedPermissions = permissions.map(
      (permission) =>
        PermissionUtils.denormalizeGroupAndPermission(group, permission));

    query.$pull[type] = {$in: denormalizedPermissions};

    // Update the user's permissions
    Meteor.users.update(userId, query);
  },

  denormalizeGroupAndPermission (group, permission) {
    //TODO(ajax) Make seperator configurable and potentially a disallowed
    // character in permissions and group titles
    return group + ':' + permission;
  },
  normalizePermissionString(permissionString) {
    const split = permissionString.split(':');
    return {group: split[0], permission: split[1]};
  }
};

export { PermissionUtils };
