// Auto subscribe to userPermissions
Tracker.autorun(() => {
  Meteor.subscribe('userPermissions');
});
