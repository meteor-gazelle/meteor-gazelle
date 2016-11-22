Meteor.publish('wiki', function () {
  return Articles.find({}, { sort: { createdat: -1 }});
});