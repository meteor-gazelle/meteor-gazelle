import { Permissions } from './permissions.js';
import { PermissionGroup } from './permissionGroup.js';
import { Methods } from './methods.js';
import './publications.js';

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
