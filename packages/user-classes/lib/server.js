import './callbacks.js';
import { Methods } from './methods.js';
import { UserClass } from './userClass.js';
import { Permissions, PermissionGroup } from 'meteor/meteor-gazelle:permissions';

const group = new PermissionGroup('user-classes', 'Allows management of user classes', [
  {
    title: 'edit-classes',
    description: 'Edit the classes on the site.'
  }, {
    title: 'edit-user-classes',
    description: 'Edit a user\'s classes.'
  }]);

Permissions.register(group);


//TODO(ajax) Add permissions and login check
Meteor.publish('manage-user-classes', function () {
  return UserClass.find();
});

export { Methods };
