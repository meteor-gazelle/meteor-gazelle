import { Permissions } from './permissions.js';

// Auto subscribe to userPermissions
Tracker.autorun(() => {
  Meteor.subscribe('userPermissions');
});

export { Permissions };
