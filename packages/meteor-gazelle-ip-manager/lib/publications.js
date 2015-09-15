Meteor.publish('bannedIps', function () {
  // TODO(rhomes) permission check here
  // TODO(rhomes) filter data to return?
  return BannedIps.find();
});
