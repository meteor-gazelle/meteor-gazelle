import { Permissions } from './permissions.js';
import { PermissionGroup } from './permissionGroup.js';
import { Methods } from './methods.js';

//TODO(ajax) Reconsider what needs to be done here
Meteor.publish('permissions', function () {
  return Permissions.find();
});

Meteor.publish('loggedInUserPermissions', function () {
  //TODO(ajax) Logged in check can become redundant, create util function.
  // Confirm user is logged in before publishing their permissions.
  if (!this.userId) {
    this.error(new Meteor.Error('user-not-logged-in'));
  }
  return Meteor.users.find(this.userId, { fields: { permissionsEnabled : 1, permissionsDisabled: 1 }});
});


export { Permissions, PermissionGroup, Methods };
