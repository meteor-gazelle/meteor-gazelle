import { Permissions } from './permissions.js';
import { PermissionUtils } from './permissionUtils.js';
import { LoggedInMixin } from 'meteor/meteor-gazelle:method-mixins';

const Methods = {
  // Add an enabled permission to a user
  addEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addEnabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ userId, group, permissions }) {
      PermissionUtils.addPermissions(userId, group, permissions,
        PermissionUtils.ENABLED_PERMISSIONS_FIELD);
    }
  }),
  // Remove an enabled permission from a user
  removeEnabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeEnabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ userId, group, permissions }) {
      PermissionUtils.removePermissions(userId, group, permissions,
        PermissionUtils.ENABLED_PERMISSIONS_FIELD);
    }
  }),
  // Add a disabled permission to a user
  addDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.addDisabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ userId, group, permissions }) {
      PermissionUtils.addPermissions(userId, group, permissions,
        PermissionUtils.DISABLED_PERMISSIONS_FIELD);
    }
  }),
  // Remove a disabled permission from a user
  removeDisabledPermission: new ValidatedMethod({
    name: 'Permissions.methods.removeDisabledPermission',
    mixins: [LoggedInMixin],
    validate: null,
    run ({ userId, group, permissions }) {
      PermissionUtils.removePermissions(userId, group, permissions,
        PermissionUtils.DISABLED_PERMISSIONS_FIELD);
    }
  })
};

export { Methods };
