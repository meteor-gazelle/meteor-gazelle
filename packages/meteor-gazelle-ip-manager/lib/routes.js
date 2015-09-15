ApplicationController = RouteController.extend({
  layoutTemplate: 'layout'
});

BannedIpsController = ApplicationController.extend({
  waitOn: function () {
    return Meteor.subscribe('bannedIps');
  },
  data: function () {
    // TODO(rhomes) how to sort banned ip data?
    return { bannedIps: BannedIps.find() }
  },
  index: function () {
    this.render('index');//*
  }
});

// TODO(rhomes) permissions check here
Router.route('/bannedips', {
  name: 'bannedips',
  controller: BannedIpsController,
  action: 'index'
});
