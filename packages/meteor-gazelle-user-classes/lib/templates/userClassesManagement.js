Template.userClassesManagement.helpers({
  //TODO(ajax) Create an exists helper or something along the lines for spacebars
  userClassesExist: function () {
    return UserClasses.find().count() > 0;
  },
  userClassCreateForm: Forms.userClass,
});

Template.userClassesManagement.events({
  //add your events here
});

Template.userClassesManagement.onCreated(function () {
  //add your statement here
});

Template.userClassesManagement.onRendered(function () {
  //add your statement here
});

Template.userClassesManagement.onDestroyed(function () {
  //add your statement here
});

