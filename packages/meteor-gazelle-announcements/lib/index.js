var pages = new Meteor.Pagination('announcements', {
  itemTemplate: 'announcement'
});

Template.index.helpers({
    pages: function() {
      return pages;
    }
});

Template.index.events({
    //add your events here
});

Template.index.onCreated(function () {
    //add your statement here
});

Template.index.onRendered(function () {
    //add your statement here
});

Template.index.onDestroyed(function () {
    //add your statement here
});

