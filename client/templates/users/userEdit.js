Template.userEdit.helpers({
  schema: function () {
    return new SimpleSchema({
      userId: {
        type: String,
        autoform: {
          type: 'hidden',
          label: false
        }
      },
      classes: {
        type: [Schemas.userClassLite.pick(['classId'])]
      }
    });
  }
});

Template.userEdit.events({
  //add your statement here
});

Template.userEdit.onCreated(function () {
  //add your statement here
});

Template.userEdit.onRendered(function () {
  //add your statement here
});

Template.userEdit.onDestroyed(function () {
  //add your statement here
});
