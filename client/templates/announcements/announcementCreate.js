Template.announcementCreate.helpers({
  //add you helpers here
});

Template.announcementCreate.events({
  //add your events here
});

Template.announcementCreate.onCreated(function () {});

Template.announcementCreate.onRendered(function () {});

Template.announcementCreate.onDestroyed(function () {
  //add your statement here
});


AutoForm.addHooks('createAnnouncementForm', {
  onSuccess: function () {
    Route.go('/home');
  }
});