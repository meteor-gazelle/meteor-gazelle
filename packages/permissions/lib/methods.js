import { Permissions } from './permissions.js';
import { PermissionUtils } from './permissionUtils.js';
import { LoggedInMixin } from 'meteor/meteor-gazelle:method-mixins';

const Methods = {
  addEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addEnabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run({userId, group, permissions}) {
      PermissionUtils.addPermissions(userId, group, permissions, PermissionUtils.ENABLED_PERMISSIONS_FIELD);
    }
  }),
  removeEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeEnabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run(userId, group, permissions) {
      PermissionUtils.removePermissions(userId, group, permissions, PermissionUtils.ENABLED_PERMISSIONS_FIELD);
    }
  }),
  addDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addDisabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run(userId, group, permissions) {
      PermissionUtils.addPermissions(userId, group, permissions, PermissionUtils.DISABLED_PERMISSIONS_FIELD);
    }
  }),
  removeDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeDisabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run(userId, group, permissions) {
      PermissionUtils.removePermissions(userId, group, permissions, PermissionUtils.DISABLED_PERMISSIONS_FIELD);
    }
  })
};

export { Methods };

// TODO(ajax) Rate limit methods?

Meteor.methods({
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
