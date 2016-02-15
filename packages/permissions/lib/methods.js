import { Permissions } from './permissions.js';
import { LoggedInMixin } from 'meteor/meteor-gazelle:method-mixins';

const ENABLED_PERMISSIONS_FIELD = 'permissionsEnabled';
const DISABLED_PERMISSIONS_FIELD = 'permissionsDisabled';

function getOppositeType(type) {
  return type === ENABLED_PERMISSIONS_FIELD ? DISABLED_PERMISSIONS_FIELD : ENABLED_PERMISSIONS_FIELD;
}

function findGroupByTitle(group) {
  return Permissions.findOne({title: group});
}

function validate(group, permissions) {
  //TODO(ajax) Need a permission to check that user who is running this method actually has permission to edit permissions
  check(group, String);
  check(permissions, [String]);
}

function validatePermissionType(type) {
  if (type !== ENABLED_PERMISSIONS_FIELD && type !== DISABLED_PERMISSIONS_FIELD) {
    throw new Meteor.Error('invalid-arguments', 'Invalid permission field name');
  }
}

function validatePermissionExists(group, permissions) {
  const doc = findGroupByTitle(group);
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
}

function userHasPermission(group, permissions, type) {
  validatePermissionType(type);
  validate(group, permissions);
  //validatePermissionExists(group, permissions);

  const user = Meteor.users.findOne({_id: Meteor.userId()});
  const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

  if (user[type] === undefined) {
    return false;
  }

  const userPermissions = user[type];

  // If a passed in permission doesn't exist, return false, otherwise return true
  return _.difference(denormalizedPermissions, userPermissions).length === 0 ? true : false;
}

function addPermissions(userId, group, permissions, type) {
  validatePermissionType(type);
  validate(group, permissions);
  validatePermissionExists(group, permissions);

  // Build the query
  const query = {
    $addToSet: {},
    $pull: {}
  };

  // Denormalize the group and permissions
  const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

  query.$addToSet[type] = {$each: denormalizedPermissions};
  // If the permission is being enabled but already exists in the disabled set, remove it from the disabled set.
  query.$pull[getOppositeType(type)] = {$in: denormalizedPermissions};

  // Update the user's permissions
  Meteor.users.update(userId, query);
}

function removePermissions(userId, group, permissions, type) {
  validatePermissionType(type);
  validate(group, permissions);
  validatePermissionExists(group, permissions);

  // Build the query
  const query = {
    $pull: {}
  };

  // Denormalize the group and permissions
  const denormalizedPermissions = permissions.map((permission) => denormalizeGroupAndPermission(group, permission));

  query.$pull[type] = { $in: denormalizedPermissions };

  // Update the user's permissions
  Meteor.users.update(userId, query);
}

function denormalizeGroupAndPermission(group, permission) {
  //TODO(ajax) Make seperator configurable and potentially a disallowed character in permissions and group titles
  return group + ':' + permission;
}

const Methods = {
  hasEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.hasEnabledPermission',
    validate: null,
    run() {

    }
  }),
  hasDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.hasDisabledPermission',
    validate: null,
    run() {

    }
  }),
  addEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addEnabledPermission',
    validate: null,
    run() {

    }
  }),
  removeEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeEnabledPermission',
    validate: null,
    run() {

    }
  }),
  addDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addDisabledPermission',
    validate: null,
    run() {

    }
  }),
  removeDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeDisabledPermission',
    validate: null,
    run() {

    }
  }),
};

export { Methods };

// TODO(ajax) Rate limit methods?

Meteor.methods({
  'Permissions.methods.hasEnabledPermission' (group, permissions) {
    //TODO(ajax) How to handle 'private' Meteor methods without redundant User checks? Consider a GazelleMethod a la ValidatedMethod
    User.checkLoggedIn(this);
    return userHasPermission(group, permissions, ENABLED_PERMISSIONS_FIELD);
  },
  'Permissions.methods.hasDisabledPermission' (group, permissions) {
    User.checkLoggedIn(this);
    return userHasPermission(group, permissions, DISABLED_PERMISSIONS_FIELD);
  },
  'Permissions.methods.addEnabledPermissions' (userId, group, permissions) {
    User.checkLoggedIn(this);
    addPermissions(userId, group, permissions, ENABLED_PERMISSIONS_FIELD);
  },
  'Permissions.methods.removeEnabledPermissions' (userId, group, permissions) {
    User.checkLoggedIn(this);
    removePermissions(userId, group, permissions, ENABLED_PERMISSIONS_FIELD);
  },
  'Permissions.methods.addDisabledPermissions' (userId, group, permissions) {
    User.checkLoggedIn(this);
    addPermissions(userId, group, permissions, DISABLED_PERMISSIONS_FIELD);
  },
  'Permissions.methods.removeDisabledPermissions' (userId, group, permissions) {
    User.checkLoggedIn(this);
    removePermissions(userId, group, permissions, DISABLED_PERMISSIONS_FIELD);
  }
});
