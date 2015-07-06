Template.username.helpers({
  username: function () {
    if (!this.name) {
      var user = User.findOne({
        _id: this.id
      }, {
        username: true
      });
      this.name = user && user.username;
    }
    return this.name;
  },
  id: function () {
    if (!this.id) {
      var user = User.findOne({
        username: this.name
      }, {
        _id: true
      });
      this.id = user && user._id;
    }
    return this.id;
  }
});

Template.username.events({
  //add your events here
});

Template.username.onCreated(function () {
  Meteor.subscribe('users');
});

Template.username.onRendered(function () {});

Template.username.onDestroyed(function () {
  //add your statement here
});

