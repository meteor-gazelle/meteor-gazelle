AnnouncementsController = ApplicationController.extend({
  waitOn: function () {
    return Meteor.subscribe('announcements');
  },
  data: function () {
    return {
      announcements: Announcements.find()
    }
  },
  index: function () {
    this.render('index');
  },
  create: function () {
    this.render('create');
  }
});

Router.route('/announcements', {
  name: 'announcements',
  controller: AnnouncementsController,
  action: 'index'
});

Router.route('/announcements/create', {
  name: 'announcements/create',
  controller: AnnouncementsController,
  action: 'create'
});
