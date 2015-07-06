Meteor.publish('announcements', function () {
  return Announcements.find({}, {
    sort: {
      createdAt: -1
    }
  });
});
