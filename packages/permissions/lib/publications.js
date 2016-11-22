import { Permissions } from './permissions.js';

//TODO(ajax) Reconsider what needs to be done here
Meteor.publish('permissions', function () {
  return Permissions.find();
});

Meteor.publish('userPermissions', function (userId) {
  //TODO(ajax) Logged in check can become redundant, create util function.
  // Confirm user is logged in before publishing their permissions.
  if (!this.userId) {
    this.error(new Meteor.Error('user-not-logged-in'));
  }

  //TODO(ajax) Add a permission check so only privleged users can subscribe to a users permissions.
  if (!userId) {
    userId = this.userId;
  }

  return Meteor.users.find(userId, {
    fields: {
      permissionsEnabled: 1,
      permissionsDisabled: 1
    }
  });
});
