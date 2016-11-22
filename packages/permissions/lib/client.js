import { Permissions } from './permissions.js';
import { Methods } from './methods.js';

// Auto subscribe to userPermissions
Tracker.autorun(() => {
  Meteor.subscribe('userPermissions');
});

export { Permissions, Methods };
