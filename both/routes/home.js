Router.map(function () {
  this.route('home', {
    path: '/home',
    template: 'home',
    waitOn: function () {
      Meteor.subscribe('announcements');
    },
    data: {
      announcements: function () {
        return Announcements.find({}, {
          sort: {
            createdAt: -1
          }
        });
      }
    }
  });
});
