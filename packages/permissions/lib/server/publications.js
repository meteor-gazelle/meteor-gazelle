//TODO(ajax) Reconsider what needs to be done here
Meteor.publish('permissions', () => {
  return PermissionsCollection.find();
});
