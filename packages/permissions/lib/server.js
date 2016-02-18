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
  return Meteor.users.find(this.userId, {
    fields: {
      permissionsEnabled: 1,
      permissionsDisabled: 1
    }
  });
});

//TODO(ajax) Should this be defined here or elsewhere?
// Create permissions for permission management
const group = new PermissionGroup('manage-permissions', 'Allows management of users\' permissions', [
  {
    title: 'view',
    description: 'View a user\'s permissions',
  }, {
    title: 'edit',
    description: 'Edit a user\'s permissions'
  }]);

Permissions.register(group);


export { Permissions, PermissionGroup, Methods };
